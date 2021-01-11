import battery from '@system.battery';
import brightness from '@system.brightness';
import device from '@system.device';
import geolocation from '@system.geolocation';
import network from '@system.network';

export default {
    data: {
    // 电量
        batteryLevel: 0.00, // 电池电量，取值范围：0.00 - 1.00
        batteryCharging: false, // 电池是否在充电中

    // 屏幕亮度
        brightness: 0, // 屏幕亮度，取值范围1-255
        brightnessMode: 0, // 屏幕亮度模式, 0为手动, 1为自动

    // 设备
        deviceBrand: '', // 品牌
        deviceManufacturer: '', // 生产商
        deviceModel: '', // 型号
        deviceLanguage: '', // 语言
        deviceRegion: '', // 系统地区
        deviceScreenShape: '', // 屏幕形状 rect：方形屏 circle：圆形屏

    // 地理位置
        locationLongitude: '', // 经度
        locationLatitude: '', // 纬度
        locationAccuracy: '', // 精确度
        time: '', // 时间
        locationType: '', // 设备支持的定位类型['gps', 'network']

    // 网络
        networkType: 'none', // 网络类型，可能值有2g，3g，4g，wifi，none等
        networkMetered: false, // 是否按照流量计费
    },
    onShow() {
        battery.getStatus({
            success: (data) => {
                this.batteryLevel = data.level;
                this.batteryCharging = data.charging;
            },
            fail: (data, code) =>{
                console.info('fail to get battery level code:' + code + ', data: ' + data);
            },
        });

        brightness.getValue({
            success: (data) => {
                this.brightness = data.value;
            },
            fail: (data, code) => {
                console.info('get brightness fail, code: ' + code + ', data: ' + data);
            },
        });

        brightness.getMode({
            success: (data) => {
                this.brightnessMode = data.mode;
            },
            fail: (data, code) => {
                console.info('handling get mode fail, code:' + code + ', data: ' + data);
            },
        });

        device.getInfo({
            success: (data) =>{
                this.deviceBrand = data.brand;
                this.deviceManufacturer = data.manufacturer;
                this.deviceModel = data.model;
                this.deviceLanguage = data.language;
                this.deviceRegion = data.region;
                this.deviceScreenShape = data.screenShape;
            },
            fail: (data, code) => {
                console.info('fail get device info code:' + code + ', data: ' + data);
            },
        });

        geolocation.subscribe({
            success: (data) =>{
                this.locationLongitude = data.longitude.toFixed(2);
                this.locationLatitude = data.latitude.toFixed(2);
                this.locationAccuracy = data.accuracy.toFixed(2);
                this.time = new Date(data.time).toLocaleDateString();
                console.info('success get location. Longitude/Latitude: ' + this.locationLongitude + '/' + this.locationLatitude);
            },
            fail: (data, code) => {
                console.info('fail to get location. code:' + code + ', data:' + data);
            },
        });

        geolocation.getLocationType({
            success: (data) =>{
                this.locationType = data.types.toString();
            },
            fail: (data, code) =>{
                console.info('fail to get location. code:' + code + ', data:' + data);
            },
        });

        network.getType({
            success: (data) => {
                this.networkType = data.type;
                this.networkMetered = data.metered;
            },
            fail: (data, code) =>{
                console.info('fail to get network type code:' + code + ', data:' + data);
            },
        });
    },
    onDestroy() {
        geolocation.unsubscribe();
    }
}
