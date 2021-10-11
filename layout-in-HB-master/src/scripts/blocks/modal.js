const modalWrapper = document.querySelector('.js-modal-wrapper')
const closeButton = document.querySelector('.js-close-modal')
const openButton = document.querySelector('.js-open-modal')

openButton.addEventListener('click',()=>{
    modalWrapper.classList.add('modal-wrapper--active')
    document.body.style.overflow = 'hidden'
})
modalWrapper.addEventListener('click',(e) =>{
    if(e.target === closeButton || e.target == modalWrapper )
        modalWrapper.classList.remove('modal-wrapper--active')
        document.body.style.overflow = 'auto'
})