import routing from '../../common/routing.js';

const ARROW_UP = 'up';
const ARROW_DOWN = 'down';
const ARROW_LEFT = 'left';
const ARROW_RIGHT = 'right';
const ARROWS = [ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT];
const ARROW_KEYS = {
    '19': ARROW_UP,
    '20': ARROW_DOWN,
    '21': ARROW_LEFT,
    '22': ARROW_RIGHT
};
const CANVAS_LENGTH = 305;
const BORDER_WIDTH = 5;
var numbers = [];
var timer;

export default {
    private: {
        seconds: 0,
        isSuccess: false
    },
    public: {
        cols: 4,
        level: 50
    },
    onShow() {
        this.seconds = 0;
        this.isSuccess = false;
        this.clearTimer();
        this.initGrids(this.cols);
        this.drawGrids();
    },
    move(event) {
        if (this.isSuccess || (event.code < 19 || event.code > 22)) {
            return;
        }

        this.swapGrids(ARROW_KEYS[event.code]);
        this.drawGrids();

        if (this.checkResult()) {
            this.clearTimer();
            this.isSuccess = true;
        }
    },
    start() {
        this.seconds = 0;
        this.isSuccess = false;

        this.initGrids(this.cols);
        this.randomGrids(this.level);
        this.drawGrids();

        timer = setInterval(this.timing, 1000);
    },
    gotoSetting() {
        routing.gotoSetting();
    },
    gotoHeroes() {
        routing.gotoHeroes();
    },
    timing() {
        this.seconds++;
    },
    clearTimer() {
        if (timer) {
            clearInterval(timer);
        }
    },
    initGrids(cols) { // 根据宫格数初始化数字二维数组
        numbers = [];
        for (let row = 0; row < cols; row++) {
            numbers[row] = [0];
            for (let col = 0; col < cols; col++) {
                if (row == cols - 1 && col == cols - 1) {
                    numbers[row][col] = 0;
                } else {
                    numbers[row][col] = row * cols + col + 1;
                }
            }
        }
    },
    randomGrids(level) { // 根据难度级别打乱数字，level即移动数字的次数
        this.swapGrids(ARROW_DOWN);
        this.swapGrids(ARROW_RIGHT);

        for (let i = 0; i < level; i++) {
            let randomIndex = Math.floor(Math.random() * 4);
            let direction = ARROWS[randomIndex];
            this.swapGrids(direction);
        }
    },
    drawGrids() { // 绘制数字宫格
        const context = this.$element('canvas').getContext('2d');

        const cols = numbers.length;
        const sideLength = (CANVAS_LENGTH - (cols + 1) * BORDER_WIDTH) / cols
        const heroImage = new Image();
        heroImage.src = 'common/images/hero.png';

        for (let row = 0; row < cols; row++) {
            for (let column = 0; column < cols; column++) {
                context.fillStyle = '#D2691E';
                const leftTopX = column * (BORDER_WIDTH + sideLength) + BORDER_WIDTH;
                const leftTopY = row * (BORDER_WIDTH + sideLength) + BORDER_WIDTH;
                context.fillRect(leftTopX, leftTopY, sideLength, sideLength);

                context.drawImage(heroImage, leftTopX + sideLength - 20, leftTopY + sideLength - 20, 20, 20);

                const gridStr = numbers[row][column].toString();
                if (gridStr != '0') {
                    context.font = '40px HYQiHei-65S';
                    context.fillStyle = '#000000';
                    const offsetX = (sideLength - 22 * gridStr.length) / 2;
                    const offsetY = (sideLength + 40) / 2 - 5;
                    context.fillText(gridStr, leftTopX + offsetX, leftTopY + offsetY);
                }
            }
        }
    },
    swapGrids(direction) { // 与0交换位置
        const cols = numbers.length;

        // 查找0所在的行与列
        let zero_row;
        let zero_col;
        for (let row = 0; row < cols; row++) {
            for (let column = 0; column < cols; column++) {
                if (numbers[row][column] == 0) {
                    zero_row = row;
                    zero_col = column;
                    break;
                }
            }
        }

        let target_row;
        let target_col;
        if (direction == ARROW_LEFT && zero_col != cols - 1) {
            target_row = zero_row;
            target_col = zero_col + 1
        } else if (direction == ARROW_RIGHT && zero_col != 0) {
            target_row = zero_row;
            target_col = zero_col - 1
        } else if (direction == ARROW_UP && zero_row != cols - 1) {
            target_row = zero_row + 1;
            target_col = zero_col;
        } else if (direction == ARROW_DOWN && zero_row != 0) {
            target_row = zero_row - 1;
            target_col = zero_col;
        } else {
            return;
        }

        // 与0交换位置
        numbers[zero_row][zero_col] = numbers[target_row][target_col];
        numbers[target_row][target_col] = 0;
    },
    checkResult() { // 检查数字是否已有序排列
        const cols = numbers.length;
        for (let row = 0; row < cols; row++) {
            for (let column = 0; column < cols; column++) {
                if (row == cols - 1 && column == cols - 1) {
                    return numbers[row][column] == 0;
                }
                if (numbers[row][column] != row * cols + column + 1) {
                    return false;
                }
            }
        }
        return true;
    }
}
