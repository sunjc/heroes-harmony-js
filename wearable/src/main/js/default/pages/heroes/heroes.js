import routing from '../../common/routing.js';

export default {
    data: {
        heroes: ['Dr Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma', 'Tornado']
    },
    gotoHuarong() {
        routing.gotoHuarong();
    },
    gotoSleep() {
        routing.gotoSleep();
    },
    gotoSystem() {
        routing.gotoSystem();
    }
}
