import routing from '../../common/routing.js';
import service from '../../common/service.js';

export default {
    data: {
        hero: {}
    },
    onShow() {
        service.getOne(this.id).then(result => {
            let ret = JSON.parse(result);
            if (ret.code == 0) {
                this.hero = {
                    id: ret.result.id,
                    name: ret.result.name
                };
            }
        });
    },
    save() {
        service.updateHero(this.hero).then(result => {
            let ret = JSON.parse(result);
            if (ret.code == 0) {
                this.back();
            }
        })
    },
    nameChange(event) {
        this.hero.name = event.text;
    },
    back() {
        routing.back();
    }
}
