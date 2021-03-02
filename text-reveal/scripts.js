const body = document.body;
let timer = null;

body.addEventListener('mouseenter', () => {

    let t = 0

    timer = setInterval(() => {

        let start = Math.min(100, t);
        let end = Math.max(0, t - 25 % 100);

        body.style.setProperty('--start', start + '%');
        body.style.setProperty('--end', end + '%');

        end == 100 ? clearInterval(timer) : false;

        t++;

    }, 5)

});

body.addEventListener('mouseleave', () => {
    clearInterval(timer);
    body.style.setProperty('--start', '0%');
    body.style.setProperty('--end', '0%');
});