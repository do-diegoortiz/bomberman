import { directions, levelItemType } from './constants';
import { LevelItem } from './level-item'
import './level.scss';

const LEVEL_WIDTH = 13
const LEVEL_HEIGHT = 13
const SOFT_WALL_RATIO = 0.3

export class Level {
    #columns = []
    #levelEl = document.createElement('div');
    #rootEl = document.getElementById('root');
    #block = document.createElement('div');

    render() {
        this.#columns = this.#getColumns();
        this.#block.classList.add('block');

        this.#setInitialWalls();

        this.#columns.forEach((row, y) => {
            row.forEach((column, x) => {
                const newBlock = this.#block.cloneNode();
                newBlock.classList.add(column.type);
                newBlock.setAttribute('id', `${x},${y}`)
                this.#levelEl.appendChild(newBlock);
            });
        });
        
        this.#levelEl.classList.add('level');
        this.#rootEl.appendChild(this.#levelEl)
    }

    #setInitialWalls() {
        this.#columns.forEach((row, rowIndex) => {
            row.forEach((column, colIndex) => {
                if (rowIndex === 6 && colIndex === 6) {
                    return;
                }

                const isFirstRowCol = (rowIndex === 0) || (colIndex === 0)
                const isLastRowCol = (rowIndex === LEVEL_HEIGHT - 1) || (colIndex === LEVEL_WIDTH - 1)

                const isHardWall = (rowIndex % 2 === 0) && (colIndex % 2 === 0)

                if (isFirstRowCol || isLastRowCol) {
                    column.type = levelItemType.OUTER_WALL
                } else if (isHardWall) {
                    column.type = levelItemType.HARD_WALL
                } else if (Math.random() < SOFT_WALL_RATIO) {
                    column.type = levelItemType.SOFT_WALL
                }
            })
        })
    }

    armBomb(x, y) {
        const newBlock = this.#block.cloneNode();
        newBlock.classList.add('bomb');
        newBlock.style.top = `${y * 50}px`
        newBlock.style.left = `${x * 50}px`
        this.#levelEl.appendChild(newBlock);

        setTimeout(() => {
            this.#detonate(x, y)
            newBlock.remove();
        }, 2000)
        // Destroy
    }

    canMove(player, direction) {
        switch (direction) {
            case directions.LEFT:
                return this.#columns[player.y][player.x - 1].type === levelItemType.EMPTY
            case directions.TOP:
                return this.#columns[player.y - 1][player.x].type === levelItemType.EMPTY
            case directions.RIGHT:
                return this.#columns[player.y][player.x + 1].type === levelItemType.EMPTY
            case directions.DOWN:
                return this.#columns[player.y + 1][player.x].type === levelItemType.EMPTY
        }
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

    #detonate(x, y) {
        const nodesToDelete = [];

        const target_top = this.#columns[y-1][x]
        if (target_top.type.includes(levelItemType.SOFT_WALL)) {
            target_top.type = levelItemType.EMPTY
            const node = document.getElementById(`${x},${y-1}`)
            nodesToDelete.push(node)
        }

        const target_right = this.#columns[y][x+1]
        if (target_right.type.includes(levelItemType.SOFT_WALL)) {
            target_right.type = levelItemType.EMPTY
            const node = document.getElementById(`${x+1},${y}`)
            nodesToDelete.push(node)
        }

        const target_bottom = this.#columns[y+1][x]
        if (target_bottom.type.includes(levelItemType.SOFT_WALL)) {
            target_bottom.type = levelItemType.EMPTY
            const node = document.getElementById(`${x},${y+1}`)
            nodesToDelete.push(node)
        }

        const target_left = this.#columns[y][x-1]
        if (target_left.type.includes(levelItemType.SOFT_WALL)) {
            target_left.type = levelItemType.EMPTY
            const node = document.getElementById(`${x-1},${y}`)
            nodesToDelete.push(node)
        }

        nodesToDelete.forEach(node => {
            node.classList.remove(levelItemType.SOFT_WALL)
            node.classList.add(levelItemType.EMPTY)
        })
    }
}