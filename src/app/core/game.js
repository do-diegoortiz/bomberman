import { directions } from "./constants"
import { Level } from "./level"
import { Player } from "./player"

export class Game {
    #level = new Level()
    #player = new Player()

    init() {
        this.#level.render()
        this.#player.render()

        this.#addKeysListener()
    }

    #addKeysListener() {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                    this.#level.canMove(this.#player, directions.LEFT) ? this.#player.move(directions.LEFT) : null
                    break
                case 38:
                    this.#level.canMove(this.#player, directions.TOP) ? this.#player.move(directions.TOP) : null
                    break
                case 39:
                    this.#level.canMove(this.#player, directions.RIGHT) ? this.#player.move(directions.RIGHT) : null
                    break
                case 40:
                    this.#level.canMove(this.#player, directions.DOWN) ? 
                    this.#player.move(directions.DOWN) : null
                    break
            }
        })
    }
}