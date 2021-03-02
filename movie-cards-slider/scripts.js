const swiper = new Swiper('.swiper-container', {
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 0,
        },
    },
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // }
});