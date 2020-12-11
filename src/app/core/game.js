import { Level } from "./level"
import { Player } from "./player"

export class Game {
    #level = new Level()
    #player = new Player()

    init() {
        this.#level.render()
        this.#player.render()
    }
}