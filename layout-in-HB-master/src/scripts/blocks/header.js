document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('.js-header')
    const headerWrapper = document.querySelector('.js-header-wrapper')
    if (headerWrapper && headerElement) {
        headerWrapper.style.setProperty('--header-height', `${headerElement.clientHeight}px`)
    }

    class Header {
        constructor(header) {
            this.header = document.querySelector(header)
            this.presentHeight = document.querySelector('.present').clientHeight
            this.scrollHeader()
        }
        #toggleFixed() {
            return window.pageYOffset > this.presentHeight
                ? this.header.classList.add('header--fixed')
                : this.header.classList.remove('header--fixed')
        }
        scrollHeader(){
            if (this.header){
                document.addEventListener('scroll', () => {
                    this.#toggleFixed()
                })
            }
        }
    }

    new Header('.js-header')
})