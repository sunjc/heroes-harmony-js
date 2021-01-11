import routing from '../../common/routing.js';
import service from '../../common/service.js';

export default {
    data: {
        heroes: [],
        heroName: ''
    },
    onShow() {
        service.queryAll().then(result => {
            let ret = JSON.parse(result);
            if (ret.code == 0) {
                this.heroes = ret.result;
            }
        });
    },
    addHero() {
        service.addHero({
            name: this.heroName
        }).then(() => {
            this.heroName = '';
            this.onShow();
        });
    },
    deleteHero(e) {
        service.deleteHero(e.detail.id).then(() => {
            this.onShow();
        });
    },
    nameChanged(event) {
        this.heroName = event.text;
    },
    gotoDetails(id) {
        routing.gotoDetails(id);
    },
}
