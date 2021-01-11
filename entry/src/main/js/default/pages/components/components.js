import prompt from '@system.prompt';
import configuration from '@system.configuration';
import routing from '../../common/routing.js';

const EMAIL_REG = /^([a-zA-Z0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

export default {
    data: {
        email: 'sjc-925@163.com',
        progress: 5,
        downloadText: "Download",
        range: ["5", "10", "15", "20", "25"],
        ranges: [["a", "b", "c", "d", "e"], ["1", "2", "3", "4", "5"]],
        trailImages: [{
                          src: '/common/images/panda_trail01.jpg'
                      }, {
                          src: '/common/images/panda_trail02.jpg'
                      }, {
                          src: '/common/images/panda_trail03.jpg'
                      }, {
                          src: '/common/images/panda_trail04.jpg'
                      }, {
                          src: '/common/images/panda_trail05.jpg'
                      }, {
                          src: '/common/images/panda_trail06.jpg'
                      }],
        pandaImages: ['/common/images/panda01.jpg', '/common/images/panda02.jpg', '/common/images/panda03.jpg',
                      '/common/images/panda04.jpg', '/common/images/panda05.jpg', '/common/images/panda06.jpg'],
        lineData: [
            {
                strokeColor: '#0081ff',
                fillColor: '#cce5ff',
                data: [763, 550, 551, 554, 731, 654, 525, 696, 595, 628, 791, 505, 613, 575, 475, 553, 491, 680, 657, 716],
                gradient: true,
            }
        ],
        lineOps: {
            xAxis: {
                min: 0,
                max: 20,
                display: false,
            },
            yAxis: {
                min: 0,
                max: 1000,
                display: false
            },
            series: {
                lineStyle: {
                    width: "5px",
                    smooth: true,
                },
                headPoint: {
                    shape: "circle",
                    size: 20,
                    strokeWidth: 5,
                    fillColor: '#ffffff',
                    strokeColor: '#007aff',
                    display: true
                },
                loop: {
                    margin: 2,
                    gradient: true,
                }
            }
        },
        barData: [{
                      fillColor: '#f07826',
                      data: [763, 550, 551, 554, 731, 654, 525, 696, 595, 628],
                  },
                  {
                      fillColor: '#cce5ff',
                      data: [535, 776, 615, 444, 694, 785, 677, 609, 562, 410],
                  },
                  {
                      fillColor: '#ff88bb',
                      data: [673, 500, 574, 483, 702, 583, 437, 506, 693, 657],
                  },
        ],
        barOps: {
            xAxis: {
                min: 0,
                max: 20,
                display: false,
                axisTick: 10
            },
            yAxis: {
                min: 0,
                max: 1000,
                display: false
            },
        },
    },
    emailChanged(event) {
        this.email = event.value;
    },
    validateEmail(event) {
        if (event.value != 6) {
            return;
        }

        if (!EMAIL_REG.test(this.email)) {
            const emailInput = this.$element('email-input');
            emailInput.showError({
                error: 'please enter a valid email address'
            });
        }
    },
    setProgress() {
        this.progress += 10;
        this.downloadText = this.progress + "%";
        this.$element('download-btn').setProgress({
            progress: this.progress
        });
        if (this.progress >= 100) {
            this.downloadText = "Done";
        }
    },
    selectChanged(e) {
        prompt.showToast({
            message: e.newValue
        })
    },
    showMenu() {
        this.$element("menu").show({
            x: 280,
            y: 120
        });
    },
    menuSelected(e) {
        prompt.showToast({
            message: e.value
        })
    },
    showDialog() {
        this.$element('simpledialog').show()
    },
    cancelDialog() {
        prompt.showToast({
            message: 'Dialog cancelled'
        })
    },
    cancel() {
        this.$element('simpledialog').close()
        prompt.showToast({
            message: 'Successfully cancelled'
        })
    },
    confirm() {
        this.$element('simpledialog').close()
        prompt.showToast({
            message: 'Successfully confirmed'
        })
    },
    showPromptDialog() {
        prompt.showDialog({
            title: 'Title Info',
            message: 'Message Info',
            buttons: [
                {
                    text: 'positive',
                    color: '#00ff00'
                }, {
                    text: 'negative',
                    color: '#ff0000'
                }, {
                    text: 'neutral',
                    color: '#aaaaaa'
                }
            ],
            success: function (data) {
                console.info('dialog success callback，click button: ' + data.index);
            },
            cancel: function () {
                console.info('dialog cancel callback');
            },
            complete: function () {
                console.info('dialog complete callback');
            }
        });
    },
    back() {
        routing.back();
    }
}