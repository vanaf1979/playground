const init = () => {
    if (window.DeviceOrientationEvent) {
        document.addEventListener('deviceorientation', deviceOrientationHandler, false);
        console.log('DeviceOrientationEvent Supported')
    }
}

const deviceOrientationHandler = (e) => {
    const absolute = document.getElementById('absolute');
    const alpha = document.getElementById('alpha');
    const beta = document.getElementById('beta');
    const gamma = document.getElementById('gamma');

    absolute.innerHTML = JSON.stringify(e.absolute);
    alpha.innerHTML = JSON.stringify(e.alpha);
    beta.innerHTML = JSON.stringify(e.beta);
    gamma.innerHTML = JSON.stringify(e.gamma);
}

init();