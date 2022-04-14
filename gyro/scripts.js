const init = () => {
    if (window.DeviceOrientationEvent) {
        document.addEventListener('deviceorientation', deviceOrientationHandler, false);
        const absolute = document.getElementById('absolute');
        absolute.value = JSON.stringify('Supported');
    } else {
        absolute.value = JSON.stringify('Nope');
    }
}

const deviceOrientationHandler = (e) => {
    const absolute = document.getElementById('absolute');
    const alpha = document.getElementById('alpha');
    const beta = document.getElementById('beta');
    const gamma = document.getElementById('gamma');

    absolute.value = JSON.stringify(e.absolute);
    alpha.value = JSON.stringify(e.alpha);
    beta.value = JSON.stringify(e.beta);
    gamma.value = JSON.stringify(e.gamma);
}

init();