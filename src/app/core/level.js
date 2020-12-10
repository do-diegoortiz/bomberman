import { levelItemType } from './constants';
import { LevelItem } from './level-item'
import './level.scss';

const LEVEL_WIDTH = 13
const LEVEL_HEIGHT = 13

export class Level {
    #columns = []
    #levelEl = document.createElement('div');
    #rootEl = document.getElementById('root');
    #block = document.createElement('div');

    render() {
        this.#columns = this.#getColumns();
        console.log(this.#columns)
        this.#block.classList.add('block');

        this.#setInitialWalls();

        this.#columns.forEach(row => {
            row.forEach(column => {
                const newBlock = this.#block.cloneNode();
                newBlock.classList.add(column.type);
                this.#levelEl.appendChild(newBlock);
            });
        });
        
        this.#levelEl.classList.add('level');
        this.#rootEl.appendChild(this.#levelEl)
    }

    #setInitialWalls() {
        this.#columns.forEach((row, rowIndex) => {
            row.forEach((column, colIndex) => {
                const isFirstRowCol = (rowIndex === 0) || (colIndex === 0)
                const isLastRowCol = (rowIndex === LEVEL_HEIGHT - 1) || (colIndex === LEVEL_WIDTH - 1)

                const isHardWall = (rowIndex % 2 === 0) && (colIndex % 2 === 0)

                if (isFirstRowCol || isLastRowCol) {
                    column.type = levelItemType.OUTER_WALL
                } else if (isHardWall) {
                    column.type = levelItemType.HARD_WALL
                }
            })
        })
    }

    armBomb() {
        // Place the bomb
        // Detonate
        // Destroy
    }

    canMove() {

    }

    destroy() {

    }

    #getColumns() {
        const createLevelItem = () => {
            return new LevelItem()
        }

        const createCellGroup = () => {
            const newRow = new Array(LEVEL_WIDTH).fill(null)
            return newRow.map(createLevelItem);
        }

        return new Array(LEVEL_HEIGHT).fill(null).map(createCellGroup)
    }
}