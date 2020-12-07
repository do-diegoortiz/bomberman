const LEVEL_WIDTH = 15
const LEVEL_HEIGHT = 15

class Level {
    #columns = []
    #levelEl = document.createElement('div');
    #rootEl = document.getElementById('root');

    render() {
        this.#columns = this.#getColumns();
        console.log(this.#columns)

        const levelStyles = document.createElement('style')
        levelStyles.innerHTML = `
            .level {
                display: flex;
                background: url("../assets/game.jpg");
                width: 650px;
                height: 650px;
            }
        `
        document.head.appendChild(levelStyles)

        this.#levelEl.classList.add('level');
        this.#rootEl.appendChild(this.#levelEl)
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
            return newRow.map(createLevelItem)
        }

        return new Array(LEVEL_HEIGHT).fill(null).map(createCellGroup)
    }
}