import { directions } from './constants';
import './player.scss'

export class Player {
    x = 1;
    y = 1;
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

    move(direction) {
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

        this.#playerEl.style.transform = `translate(${this.x * 50}px, ${this.y * 50}px)`
    }
}