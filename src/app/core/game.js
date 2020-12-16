import { directions } from "./constants"
import { ExitScreen } from "./exit-screen"
import { Level } from "./level"
import { Player } from "./player"
import { Portal } from "./portal"
import { Splash } from "./splash"
import soundtrackAudio from '../../assets/soundtrack.mp3'
import armBombTrackAudio from '../../assets/arm-bomb.mp3'
import explodeTrackAudio from '../../assets/explosion.mp3'
import exitTrackAudio from '../../assets/exit.mp3'

export class Game {
    #level = new Level()
    #player = new Player()
    #portal = new Portal()
    #exitScreen = new ExitScreen();
    #splashScreen = new Splash();
    #keyListener = () => {}
    #gameStarted = false;
    #audio = {
        game: {
            audioElement: document.createElement('audio'),
            sourceElement: document.createElement('source')
        },
        bomb: {
            audioElement: document.createElement('audio'),
            sourceElement: document.createElement('source')
        },
        explosion: {
            audioElement: document.createElement('audio'),
            sourceElement: document.createElement('source')
        },
        exit: {
            audioElement: document.createElement('audio'),
            sourceElement: document.createElement('source')
        }
    }

    init() {
        this.#splashScreen.render()
        this.#addKeysListener()
        this.#startSoundEffects()
    }

    #startTheGame() {
        this.#level.render()
        this.#player.render()
        this.#portal.render()
    }

    #startSoundEffects() {
        this.#audio.game.sourceElement.src = soundtrackAudio
        this.#audio.game.sourceElement.type = 'audio/mpeg'
        this.#audio.game.audioElement.setAttribute('loop', '')
        this.#audio.game.audioElement.setAttribute('autoplay', '')
        this.#audio.game.audioElement.appendChild(this.#audio.game.sourceElement)

        this.#audio.bomb.sourceElement.src = armBombTrackAudio
        this.#audio.bomb.sourceElement.type = 'audio/mpeg'
        this.#audio.bomb.audioElement.appendChild(this.#audio.bomb.sourceElement)

        this.#audio.explosion.sourceElement.src = explodeTrackAudio
        this.#audio.explosion.sourceElement.type = 'audio/mpeg'
        this.#audio.explosion.audioElement.appendChild(this.#audio.explosion.sourceElement)

        this.#audio.exit.sourceElement.src = exitTrackAudio
        this.#audio.exit.sourceElement.type = 'audio/mpeg'
        this.#audio.exit.audioElement.appendChild(this.#audio.exit.sourceElement)

        document.getElementById('root').appendChild(this.#audio.game.audioElement)
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
                    this.#level.armBomb(this.#player.x, this.#player.y, () => this.#audio.explosion.audioElement.play())
                    this.#audio.bomb.audioElement.play()
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

        this.#audio.game.audioElement.pause()
        this.#audio.exit.audioElement.play()
    }
}