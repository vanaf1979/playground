const deviceOrientationHandler = (e) => {
    const absolute = document.getElementById('absolute');
    const alpha = document.getElementById('alpha');
    const beta = document.getElementById('beta');
    const gamma = document.getElementById('gamma');
    const all = document.getElementById('all');

    absolute.value = JSON.stringify(e.absolute);
    alpha.value = JSON.stringify(e.alpha);
    beta.value = JSON.stringify(e.beta);
    gamma.value = JSON.stringify(e.gamma);
    all.value = JSON.stringify(e);
}

const init = () => {
    if (window.DeviceOrientationEvent) {
        document.addEventListener('deviceorientation', deviceOrientationHandler, true);
        const absolute = document.getElementById('absolute');
        absolute.value = JSON.stringify('Supportedd');
    } else {
        absolute.value = JSON.stringify('Nope');
    }
}

init();