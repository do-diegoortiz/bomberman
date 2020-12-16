import { directions } from './constants'
import './player.scss'

const MAX_FRAMES = 4

export class Player {
    x = 1;
    y = 1;
    #frame = 1
    #playerEl = document.createElement('div')
    #rootEl = document.getElementById('root');

    render() {
        this.#playerEl.classList.add('player')
        this.#playerEl.style.transform = `translate(${this.x * 50}px, ${this.y * 50}px)`

        this.#rootEl.appendChild(this.#playerEl)
    }

    destroy() {
        this.#playerEl.remove()
    }

    move(direction, canMove) {
        if (canMove) {
            switch (direction) {
                case directions.RIGHT:
                    this.x = this.x + 1
                    break
                case directions.LEFT:
                    this.x = this.x - 1
                    break
                case directions.TOP:
                    this.y = this.y - 1
                    break
                case directions.DOWN:
                    this.y = this.y + 1
                    break
            }
        }

        window.requestAnimationFrame(() => this.#update(direction))
    }

    #update(direction) {
        this.#playerEl.style.transform = `translate(${this.x * 50}px, ${this.y * 50}px)`

        this.#frame ++

        if (this.#frame > MAX_FRAMES) {
            this.#frame = 1
        }

        this.#playerEl.className = 'player'
        this.#playerEl.classList.add(`${direction}-${this.#frame}`)
    }
}