import prompt from '@system.prompt';
import routing from '../../common/routing.js';
import service from '../../common/service.js';

export default {
    data: {
        topHeroes: [],
        heroes: [],
    },
    onShow() {
        service.queryTop4().then(result => {
            let ret = JSON.parse(result);
            if (ret.code == 0) {
                this.topHeroes = ret.result;
            } else {
                console.error(result);
                prompt.showToast({
                    message: ret.message
                });
            }
        });
    },
    search(event) {
        service.queryByName(event.text).then(result => {
            let ret = JSON.parse(result);
            if (ret.code == 0) {
                this.heroes = ret.result;
            }
        });
    },
    gotoDetails(id) {
        routing.gotoDetails(id);
    },
    gotoComponents() {
        routing.gotoComponents();
    },
}
