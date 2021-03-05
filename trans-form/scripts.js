import gsap from 'https://cdn.skypack.dev/gsap';


/*
 * Get references to the necesary elements.
 */
const container = document.querySelector('.section_container');
const form = document.querySelector('.form');
const shadow = document.querySelector('.form__shadow');
const stage = document.querySelector('.form__container');
const toggle = document.querySelector('.form__toggle');


/*
 * Set the initial 3D transforms.
 */
gsap.set(form, {
    perspective: 500,
    rotateX: '50deg',
    rotateY: '40deg',
    rotateZ: '-20eg',
    x: '-50%',
    z: 0,
    scale: 0.7
});

gsap.set(shadow, {
    perspective: 500,
    rotateX: '50deg',
    rotateY: '40deg',
    rotateZ: '-20eg',
    x: '-50%',
    z: 0,
    scale: 0.7
});


/*
 * Create the hover timeline.
 */
var hover = gsap.timeline({
    // paused: true,
    repeat: -1,
    yoyo: true,
})
    .to(form, {
        duration: 1.5,
        y: -30,
        z: 0,
    })
    .to(shadow, {
        duration: 1.5,
        filter: 'blur(25px)',
    }, 0)


/*
 * Create the toCenter timeline.
 */
const toCenter = gsap.timeline({
    paused: true,
    duration: 0.8,
})
    .to(form, {
        duration: 0.8,
        rotateX: -0,
        rotateY: -0,
        rotateZ: -0,
        y: 0,
        scale: 1
    }, 0)
    .to(shadow, {
        duration: 0.8,
        rotateX: -0,
        rotateY: -0,
        rotateZ: -0,
        height: 50,
        y: form.offsetHeight / 10,
        filter: 'blur(25px)',
        scale: 1
    }, 0)
    .to(stage, {
        duration: 0.4,
        y: -120,
        ease: "back.out(3)"
    }, 0)
    .to(stage, {
        duration: 0.4,
        y: -50,
        ease: "back.out(1)"
    }, 0.4)


/*
 * On click stop the hover and start the
 * toCenter animation.
 *
 * On subsequent click, reverse toCenterm
 * and play the hover again.
 */
let centered = false;

toggle.addEventListener('click', () => {

    /* Add a class to the conainer for the text blur effect. */
    container.classList.toggle("open");

    if (centered) {
        toCenter.reverse()
        hover.play()
        centered = false
    } else {
        hover.pause()
        toCenter.play()
        centered = true
    }
});


/*
 * Listen for focus event to reveal the form.
 */
form.addEventListener('focusin', (event) => {
    container.classList.add("open");
    hover.pause()
    toCenter.play()
    centered = true
});


/*
 * Return the form to hover on blur.
 */
form.addEventListener('focusout', (event) => {
    container.classList.remove("open");
    toCenter.reverse()
    hover.play()
    centered = false
});


/*
 * Bring the form into view.
 */
gsap.set(stage, {
    opacity: 1
});