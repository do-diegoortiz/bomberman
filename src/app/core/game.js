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
                    this.#player.move(directions.LEFT)
                    break
                case 38:
                    this.#player.move(directions.TOP)
                    break
                case 39:
                    this.#player.move(directions.RIGHT)
                    break
                case 40:
                    this.#player.move(directions.DOWN)        
                    break
            }
        })
    }
}