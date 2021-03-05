import { gsap, Power1 } from 'https://cdn.skypack.dev/gsap';

const lamp = document.querySelector('.lamp');

gsap.fromTo(lamp, {
    rotate: '-12deg'
}, {
    rotate: '12deg',
    duration: 1,
    repeat:-1,
    yoyo: true,
    ease: Power1.easeInOut
});


const mask = document.querySelector('.mask');

const config = {
    deg: 1.57
}

gsap.fromTo(config, {
    deg: 1.35
}, {
    deg: 1.75,
    onUpdate: function() {
        mask.style.setProperty('--deg', config.deg);
    },
    duration: 1,
    repeat:-1,
    yoyo: true,
    ease: Power1.easeInOut
});