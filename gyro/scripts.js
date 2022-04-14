/*
 * ThreeJs.
 */
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import * as ThreeControls from "https://cdn.skypack.dev/three-controls@1.0.1";
// import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';
// import {RGBELoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/RGBELoader.js';

/*
 * Gsap and Observer plugin.
 */
import gsap from "https://cdn.skypack.dev/gsap@3.10.2";
import Observer from "https://cdn.skypack.dev/gsap@3.10.2/Observer";
gsap.registerPlugin(Observer);


let scene, camera, renderer, controls, cubeGroup;

const deviceOrientationHandler = (e) => {
    cubeGroup.rotation.z = THREE.MathUtils.degToRad(e.alpha);
    cubeGroup.rotation.x = THREE.MathUtils.degToRad(e.beta);
    cubeGroup.rotation.y = THREE.MathUtils.degToRad(e.gamma);
}

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
    camera.lookAt(0, 0, 0);
    camera.position.set(.5, .5, 12);

    /*
     * Create renderer.
     */
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.size = 2048;

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

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', deviceOrientationHandler );
            }
        });
    } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler );
    }
    // DeviceOrientationEvent.requestPermission().then(response => {
    //     if (response === 'granted') {
    //         window.addEventListener('deviceorientation', deviceOrientationHandler );
    //     }
    // })




    controls = new ThreeControls.OrbitControls(camera, renderer.domElement);

    /*
     * Add point-light to the scene.
     */
    const blue_light_color = new THREE.Color("hsl(220, 100%, 50%)");
    const blue_light = new THREE.PointLight(blue_light_color, 0, 30);
    blue_light.position.set(-.5, 5.2, 1.7);

    /*
     * Add another point-light to the scene.
     */
    const red_light_color = new THREE.Color("hsl(0, 100%, 50%)");
    const red_light = new THREE.PointLight(red_light_color, 7, 30);
    red_light.position.set(.5, 5.2, 1.7);

    /*
    * Add another point-light to the scene.
    */
    const yellow_light_color = new THREE.Color("hsl(200, 50%, 80%)");
    const front_light = new THREE.PointLight(yellow_light_color, 6, 100);
    front_light.position.set(0, 5.5, -.2);


    const blueGeometry = new THREE.BoxGeometry(4, 4, 4);

    const color = new THREE.Color(`hsl(222, 50%, 40%)`);

    const blueMaterial = new THREE.MeshLambertMaterial({
        color,
        transparent: false,
        opacity: 1
    });


    const blueCube = new THREE.Mesh(blueGeometry, blueMaterial);

    cubeGroup = new THREE.Group();

    cubeGroup.add(blueCube);

    scene.add(cubeGroup);
};

const animate = () => {
    requestAnimationFrame(animate);
    render();
};

const render = () => {
    renderer.render(scene, camera);
};

init();
animate();