document.addEventListener('DOMContentLoaded',() =>{
    new Swiper('.swiper',{
        centeredSlides: true,
        navigation: {
            nextEl: ".present__arrow--right",
            prevEl: ".present__arrow--left",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,

        },
    })
})