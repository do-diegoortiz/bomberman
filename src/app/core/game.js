import { directions } from "./constants"
import { Level } from "./level"
import { Player } from "./player"
import { Portal } from "./portal"

export class Game {
    #level = new Level()
    #player = new Player()
    #portal = new Portal()

    init() {
        this.#level.render()
        this.#player.render()
        this.#portal.render()

        this.#addKeysListener()
    }

    #addKeysListener() {
        document.addEventListener('keydown', (event) => {
            let canMove;

            switch (event.keyCode) {
                case 37:
                    canMove = this.#level.canMove(this.#player, directions.LEFT)
                    this.#player.move(directions.LEFT, canMove)
                    break
                case 38:
                    canMove = this.#level.canMove(this.#player, directions.TOP)
                    this.#player.move(directions.TOP, canMove)
                    break
                case 39:
                    canMove = this.#level.canMove(this.#player, directions.RIGHT)
                    this.#player.move(directions.RIGHT, canMove)
                    break
                case 40:
                    canMove = this.#level.canMove(this.#player, directions.DOWN)
                    this.#player.move(directions.DOWN, canMove)
                    break
                case 32:
                    this.#level.armBomb(this.#player.x, this.#player.y)
                    break
            }

            if (this.#portal.x === this.#player.x && this.#portal.y === this.#player.y) {
                this.#exitGame();
            }
        })
    }

    #exitGame() {
        this.#level.destroy()
        this.#player.destroy()
        this.#portal.destroy()
        // Show exit screen
    }
}