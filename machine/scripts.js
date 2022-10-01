import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/libs/lil-gui.module.min.js';
import gsap from 'https://cdn.skypack.dev/gsap';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
import {initCamera, initRender, initScene, makeAmbientLight, makePointLight} from '/machine/ext.js';

const canvas = {
    width: () => {
        return window.innerWidth;
    },
    height: () => {
        return 660;
    },
};

// Create a scene.
const scene = initScene();

// Create a camera.
const camera = initCamera(canvas.width(), canvas.height());

// Create a renderer
const renderer = initRender(canvas.width(), canvas.height());

// Add the renderer to the cocument
document.querySelector('#canvas').appendChild(renderer.domElement);

// Update renderer and camera on window resize.
window.addEventListener('resize', () => {
    renderer.setSize(canvas.width(), canvas.height());
    camera.aspect = canvas.width() / canvas.height();
    camera.updateProjectionMatrix();
})

// Create a point light
const point_light_one = makePointLight('hsl(200, 99%, 90%)', 3);
point_light_one.position.set(10, 10, 10);
scene.add(point_light_one);

// Create a point light
const point_light_two = makePointLight('hsl(200, 99%, 90%)', 3);
point_light_two.position.set(-10, -10, -10)
scene.add(point_light_two);

// Create a ambient light.
const ambient_light = makeAmbientLight('hsl(222, 99%, 100%)', 6);
scene.add(ambient_light);

// Create the scene's content
const loader = new GLTFLoader();
loader.load("/machine/bike.glb", function (gltf) {

    const machineGroup = new THREE.Group();

    gltf.scene.children.forEach((part) => {
        let newPart = part.clone();
        newPart.material = new THREE.MeshLambertMaterial({
            color: new THREE.Color(`hsl(220, 10%, ${(Math.floor(gsap.utils.random(0, 7)))}%)`),
            transparent: true,
            opacity: 1
        });
        newPart.castShadow = true;
        newPart.receiveShadow = true;
        machineGroup.add(newPart);
    });

    scene.add(machineGroup);
    scene.scale.set(4, 4, 4);

    // Remove loader.
    gsap.to('.demo__loader', {
        duration: .5,
        opacity: 0,
    });

    initGui();
    animate();
});

// Init Dat Gui helper panel
function initGui() {

    const effectController = {
        rot_x: 3,
        rot_y: -32,
        rot_z: -6,
        cam_x: 28.6,
        cam_y: 4.1,
        cam_z: 41
    };

    const matChanger = function () {
        scene.rotation.x = THREE.MathUtils.degToRad(effectController.rot_x);
        scene.rotation.y = THREE.MathUtils.degToRad(effectController.rot_y);
        scene.rotation.z = THREE.MathUtils.degToRad(effectController.rot_z);
        camera.position.x = effectController.cam_x;
        camera.position.y = effectController.cam_y;
        camera.position.z = effectController.cam_z;
    };

    const gui = new GUI();
    const group = gui.addFolder('Group');
    group.add(effectController, 'rot_x', -180, 180, 1).onChange(matChanger);
    group.add(effectController, 'rot_y', -180, 180, 1).onChange(matChanger);
    group.add(effectController, 'rot_z', -180, 180, 1).onChange(matChanger);
    const camFld = gui.addFolder('Camera');
    camFld.add(effectController, 'cam_x', 0, 100, .1).onChange(matChanger);
    camFld.add(effectController, 'cam_y', 0, 100, .1).onChange(matChanger);
    camFld.add(effectController, 'cam_z', 0, 100, .1).onChange(matChanger);
    gui.close();

    matChanger();

}

// Animate the scene.
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

// Add swiper slider.
let slider = new Swiper(".demo__swiper", {
    effect: "flip",
    speed: 1000,
    allowTouchMove: false
});

// Use gsap to animate the group.
const moveModel = (e) => {
    e.preventDefault();

    let target = e.target.dataset.section;
    slider.slideTo(target, 300);

    const text = e.target.dataset.text;
    const rotX = e.target.dataset.rotX;
    const rotY = e.target.dataset.rotY;
    const rotZ = e.target.dataset.rotZ;
    const camX = e.target.dataset.camX;
    const camY = e.target.dataset.camY;
    const camZ = e.target.dataset.camZ;

    const texts = document.querySelectorAll('.left');

    texts.forEach((textField) => {
        textField.style.display = 'none';
    })

    gsap.to(scene.rotation, {
        duration: 1,
        x: THREE.MathUtils.degToRad(rotX),
        y: THREE.MathUtils.degToRad(rotY),
        z: THREE.MathUtils.degToRad(rotZ)
    });

    gsap.to(camera.position, {
        duration: 1,
        x: camX,
        y: camY,
        z: camZ
    });
}

// Add listeners to the tabs
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
    tab.addEventListener('click', moveModel)
});