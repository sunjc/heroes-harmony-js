import routing from '../../common/routing.js';
import huarong from '../huarong/huarong.js';

export default {
    data: {
        columns: ["3", "4", "5"],
        levels: ["30", "50", "100", "200"],
        columnsIndex: 1,
        levelsIndex: 1,
    },
    levelChange(event) {
        this.levelsIndex = event.newSelected;
    },
    colsChange(event) {
        this.columnsIndex = event.newSelected;
    },
    back() {
        routing.gotoHuarong(this.levels[this.levelsIndex], this.columns[this.columnsIndex]);
    }
}
