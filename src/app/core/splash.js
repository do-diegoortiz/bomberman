import splashScreen from '../../assets/splash-screen.jpg';

export class Splash {
    #splashEl = document.createElement('div');

    render() {
        const docStyles = document.createElement('style')
        docStyles.innerHTML = `
            .splash-screen {
                background: url(${splashScreen});
                width: 650px;
                height: 650px;
            }

            .splash-screen-1 {
                background-position-x: 0;
            }

            .splash-screen-2 {
                background-position-x: -650px;
            }
        `
        document.head.appendChild(docStyles)
        
        const rootEl = document.getElementById('root');
        
        this.#splashEl.classList.add('splash-screen')
        rootEl.appendChild(this.#splashEl);

        this.#animate();
    }

    destroy() {
        this.#splashEl.remove();
    }

    #animate() {
        let frame = 1

        const backgroundAnimation = () => {
            this.#splashEl.classList.remove(`splash-screen-${frame}`)

            if (frame >= 2) {
                frame = 0
            }

            frame++
            
            this.#splashEl.classList.add(`splash-screen-${frame}`)

            setTimeout(() => {
                window.requestAnimationFrame(() => backgroundAnimation())
            }, 300)
        }

        backgroundAnimation();
    }
}