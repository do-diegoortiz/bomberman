class Splash {
    // console.log('It works')
    #splashEl = document.createElement('div');
    #backgroundInterval = 0;

    render() {
        const docStyles = document.createElement('style')
        docStyles.innerHTML = `
            .splash-screen {
                background: url("../assets/splash-screen.jpg");
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
        clearInterval(this.#backgroundInterval);
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
        }

        this.#backgroundInterval = setInterval(backgroundAnimation, 300)
    }
}