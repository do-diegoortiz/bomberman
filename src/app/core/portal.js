import './portal.scss'

const LEVEL_WIDTH = 13
const LEVEL_HEIGHT = 13

export class Portal {
    #portal = document.createElement('div')
    #rootEl = document.getElementById('root');
    x = 1
    y = 1

    render() {
        this.x = Math.floor(Math.random() * (LEVEL_WIDTH - 2)) + 1
        this.y = Math.floor(Math.random() * (LEVEL_HEIGHT - 2)) + 1

        if((this.y % 2 === 0) && (this.x % 2 === 0)) {
            this.x = this.x + 1
        }

        this.#portal.classList.add('portal')
        this.#portal.style.cssText = `
            top: ${this.y*50}px;
            left: ${this.x*50}px;
        `

        this.#rootEl.appendChild(this.#portal)
        this.#animate()
    }

    destroy() {
        this.#portal.remove()
    }

    #animate() {   
        let frameX = 1
        let frameY = 1

        const animate = () => {
            frameX++
            frameY++
            if (frameX > 4) {
                frameX = 1
            }

            if (frameY > 3) {
                frameY = 1
            }

            this.#portal.style.backgroundPositionX = `-${frameX*50}px`
            this.#portal.style.backgroundPositionY = `-${frameY*50}px)`

            setTimeout(() => {
                window.requestAnimationFrame(() => animate())
            }, 100)
        }

        animate()
    }
}