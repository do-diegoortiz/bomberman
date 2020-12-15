import { directions } from "./constants"
import { ExitScreen } from "./exit-screen"
import { Level } from "./level"
import { Player } from "./player"
import { Portal } from "./portal"
import { Splash } from "./splash"

export class Game {
    #level = new Level()
    #player = new Player()
    #portal = new Portal()
    #exitScreen = new ExitScreen();
    #splashScreen = new Splash();
    #keyListener = () => {}
    #gameStarted = false;

    init() {
        this.#splashScreen.render()
        this.#addKeysListener()
    }

    #startTheGame() {
        this.#level.render()
        this.#player.render()
        this.#portal.render()
    }

    #addKeysListener() {
        this.#keyListener = (event) => {
            if (!this.#gameStarted) {
                this.#splashScreen.destroy()
                this.#startTheGame()
                this.#gameStarted = true;
                
                return;
            }
            
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
                console.log('it exit')
                this.#exitGame();
            }
        }

        document.addEventListener('keydown', this.#keyListener)
    }

    #removeKeysListener() {
        document.removeEventListener('keydown', this.#keyListener)
    }

    #exitGame() {
        this.#level.destroy()
        this.#player.destroy()
        this.#portal.destroy()
        
        this.#removeKeysListener()
        this.#exitScreen.render()
    }
}