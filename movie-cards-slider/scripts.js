const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: -10,
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


swiper.slides.forEach((slide) => {
    let descEl = slide.querySelector('.description');
    let descHeight = descEl.clientHeight + 40;
    slide.style.setProperty('--desc-height', descHeight);
});

// TODO: Add resize event listener to re-calculate the heights.