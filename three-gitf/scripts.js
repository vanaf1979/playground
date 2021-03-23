import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js'
import gsap from 'https://cdn.skypack.dev/gsap';
import GLTFLoader from 'https://cdn.skypack.dev/three-gltf-loader';


// 1 - Create a scene.
const scene = new THREE.Scene();

// 2 - Create a camera.
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 200;

// 3 - Create a renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    //physicallyCorrectLights: true,
    outputEncoding: THREE.sRGBEncoding,
    gammaOutput: true,
    gammaFactor: 2.2
});


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;

// 4 - Add the renderer to the cocument
document.body.appendChild(renderer.domElement);

// 5 - Update renderer on window resize.
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

// 6 - Add orbit controls to make the scene interactive.
const controls = new OrbitControls(
    camera,
    renderer.domElement
);



const loader = new GLTFLoader();


const deg = ( deg ) => {
    return deg / 180 * Math.PI;
}


loader.load('/three-gitf/iso.glb', function ( gltf ) {

        gltf.scene.scale.set( 20, 20, 20 );
        // meshGroup.position.x = 0
        gltf.scene.position.y = -20
        // meshGroup.position.z = 0
        gltf.scene.rotation.x = deg(10);
        gltf.scene.rotation.y = deg(-55);
        gltf.scene.rotation.z = deg(0);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        scene.add( gltf.scene );

    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.log( 'An error happened' );
    }
);



//scene.add(boards);

// 12 - Create a pointlight
const blue_color = new THREE.Color('hsl(222, 99%, 70%)')
const light = new THREE.PointLight(blue_color, 1)
light.position.set(-20, 15, 30)
light.castShadow = true;
scene.add(light)

const sphereSize = 4;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );

// const orange_color = new THREE.Color('hsl(70, 99%, 50%)')
// const lighttwo = new THREE.PointLight(orange_color, 1)
// lighttwo.position.set(30, 15, 60)
// lighttwo.castShadow = true;
// scene.add(lighttwo)
//
// const pointLightHelperTwo = new THREE.PointLightHelper( lighttwo, sphereSize );
// scene.add( pointLightHelperTwo );

// 13 - Create a ambiebt light.
const ambient_color = new THREE.Color('hsl(222, 99%, 90%)')
const ambient_light = new THREE.AmbientLight(ambient_color)
scene.add(ambient_light);

// 14 - Animate the scene.
const animate = function () {
    requestAnimationFrame(animate);
    //boards.rotation.y += 0.005;
    renderer.render(scene, camera);
};
animate();

// 15 - Use gsap to animate the group.
// var hover = gsap.timeline({
//     repeat: -1,
//     yoyo: true
// })
//     .to(boards.rotation, {
//         duration: 15,
//         y: 0.5,
//         x: -0.3
//     });
