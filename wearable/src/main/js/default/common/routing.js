import router from '@system.router';

function gotoHeroes() {
    router.push({
        uri: 'pages/heroes/heroes',
    });
}

function gotoSleep() {
    router.push({
        uri: 'pages/sleep/sleep'
    });
}

function gotoSystem() {
    router.push({
        uri: 'pages/system/system'
    });
}

function gotoHuarong(level, cols) {
    if (level && cols) {
        router.replace({
            uri: 'pages/huarong/huarong',
            params: {
                level: level,
                cols: cols
            }
        });
    } else {
        router.replace({
            uri: 'pages/huarong/huarong'
        });
    }
}

function gotoSetting() {
    router.replace({
        uri: 'pages/setting/setting'
    });
}

function back() {
    router.back();
}

export default {
    gotoHeroes,
    gotoSleep,
    gotoSystem,
    gotoHuarong,
    gotoSetting,
    back
}