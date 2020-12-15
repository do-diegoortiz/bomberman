import './exit-screen.scss'

export class ExitScreen {
    #exitScreen = document.createElement('div')
    #rootEl = document.getElementById('root');

    render() {
        this.#exitScreen.classList.add('exit-screen')
        this.#rootEl.appendChild(this.#exitScreen)
    }

    destroy() {
        this.#exitScreen.remove()
    }
}