/*
 * ThreeJs.
 */
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
//import * as ThreeControls from "https://cdn.skypack.dev/three-controls@1.0.1";
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/RGBELoader.js';

let scene, camera, renderer, controls, cubeGroup, ringXGroup, ringYGroup, ringZGroup;

const init = () => {
    /*
     * Create the scene.
     */
    scene = new THREE.Scene();

    /*
     * Create Camera.
     */
    camera = new THREE.PerspectiveCamera(
        43,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.rotation.set(0, .3, 0);
    camera.position.set(1.1, 0, 3.5);

    /*
     * Create renderer.
     */
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    /*
     * Append to document.
     */
    document.body.appendChild(renderer.domElement);

    /*
     * Update renderer on window resize.
     */
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    /*
     * Add hdr lighting.
     */
    new RGBELoader().load('/gyro/map2.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    });

    /*
     * Add ambient light to the scene.
     */
    const light_color = new THREE.Color("hsl(50, 100%, 100%)");
    const ambient_light = new THREE.AmbientLight(0xffffff, 50);
    scene.add(ambient_light);

    /*
     * Add point-light to the scene.
     */
    const blue_light_color = new THREE.Color("hsl(200, 50%, 50%)");
    const blue_light = new THREE.PointLight(blue_light_color, 25, 100);
    blue_light.position.set(3, 1, 3);
    scene.add(blue_light);

    /*
     * Add another point-light to the scene.
     */
    const red_light_color = new THREE.Color("hsl(160, 100%, 50%)");
    const red_light = new THREE.PointLight(red_light_color, 25, 100);
    red_light.position.set(-3, 0, 3);
    scene.add(red_light);


    /*
     * Load the blender models
     */
    const loader = new GLTFLoader();
    loader.load(
        "/gyro/gyro.glb",
        function (gltf) {

            ringXGroup = new THREE.Group();
            const ringX = gltf.scene.getObjectByName('ring_x');
            const pin = gltf.scene.getObjectByName('pin');
            const plate = gltf.scene.getObjectByName('plate');
            ringXGroup.add(ringX);
            ringXGroup.add(pin);
            ringXGroup.add(plate);

            ringYGroup = new THREE.Group();
            const ringY = gltf.scene.getObjectByName('ring_y');
            ringYGroup.add(ringY);
            ringYGroup.add(ringXGroup);

            ringZGroup = new THREE.Group();
            const ringZ = gltf.scene.getObjectByName('ring_z');
            ringZGroup.add(ringZ);
            ringZGroup.add(ringYGroup);

            const gyroGroup = new THREE.Group();
            const ringOuter = gltf.scene.getObjectByName('ring_outer');
            const base = gltf.scene.getObjectByName('base');
            const table = gltf.scene.getObjectByName('table');
            gyroGroup.add(ringOuter);
            gyroGroup.add(base);
            gyroGroup.add(table);
            gyroGroup.add(ringZGroup);
            gyroGroup.position.y = .3;
            scene.add(gyroGroup);

        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
};

/*
 * Animate the scene.
 */
const animate = () => {
    requestAnimationFrame(animate);
    render();
};

/*
 * Render the scene.
 */
const render = () => {
    renderer.render(scene, camera);
};


/*
 * Handle orientation events.
 */
const deviceOrientationHandler = (e) => {
    ringXGroup.rotation.x = THREE.MathUtils.degToRad(e.beta) * -1;
    ringYGroup.rotation.z = THREE.MathUtils.degToRad(e.gamma) * -1;
    ringZGroup.rotation.y = THREE.MathUtils.degToRad(e.alpha) * -1;
}


/*
 * Initialize orientation events.and start the scene.
 */
const start = () => {
    if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
        DeviceOrientationEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
        });
    } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
    }

    startBt.remove();
    init();
    animate();
}

/*
 * Add click event to the start button.
 */
const startBt = document.getElementById('start');
startBt.addEventListener('click', start);