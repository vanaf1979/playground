/*
* ----------------------------------------------
* Homepage javascripts
* ----------------------------------------------
*/


/*
* ----------------------------------------------
* Run code on window load.
* ----------------------------------------------
*/
window.onload = function () {
    setNav();
};


/*
* ----------------------------------------------
* Handle navigation.
* ----------------------------------------------
*/
const setNav = () => {
    const navToggle = document.getElementById('more');
    const nav = document.getElementById('extmenu');

    nav.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    navToggle.addEventListener('click', (e) => {
        nav.classList.toggle('open');
    });
}