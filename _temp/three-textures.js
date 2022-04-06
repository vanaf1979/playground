// import * as THREE from "https://cdn.skypack.dev/three@0.139.2";

// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.139.2/examples/jsm/loaders/GLTFLoader.js';

// Three
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import * as ThreeControls from "https://cdn.skypack.dev/three-controls@1.0.1";
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/RGBELoader.js';

// Gsap
import gsap from "https://cdn.skypack.dev/gsap@3.10.2";
import Observer from "https://cdn.skypack.dev/gsap@3.10.2/Observer";
gsap.registerPlugin(Observer);


let scene, camera, renderer, controls, composer;


const createMaterial = () => {
    const textureLoader = new THREE.TextureLoader();
    const map_color = textureLoader.load('/observer/metal/color.png');
    map_color.wrapS = THREE.RepeatWrapping;
    map_color.wrapT = THREE.RepeatWrapping;
    map_color.repeat.set( 5, 5 );

    const map_metal = textureLoader.load('/observer/metal/metallic.png');
    map_metal.wrapS = THREE.RepeatWrapping;
    map_metal.wrapT = THREE.RepeatWrapping;
    map_metal.repeat.set( 5, 5 );

    const map_normals = textureLoader.load('/observer/metal/normal.png');
    map_normals.wrapS = THREE.RepeatWrapping;
    map_normals.wrapT = THREE.RepeatWrapping;
    map_normals.repeat.set( 5, 5 );

    const map_bump = textureLoader.load('/observer/metal/height.png');
    map_bump.wrapS = THREE.RepeatWrapping;
    map_bump.wrapT = THREE.RepeatWrapping;
    map_bump.repeat.set( 5, 5 );

    const map_rough = textureLoader.load('/observer/metal/roughness.png');
    map_rough.wrapS = THREE.RepeatWrapping;
    map_rough.wrapT = THREE.RepeatWrapping;
    map_rough.repeat.set( 5, 5 );

    return new THREE.MeshLambertMaterial({
        color: 0x444444,
        map: map_color,
        metalnessMap: map_metal,
        normalMap: map_normals,
        bumpMap: map_bump,
        roughnessMap: map_rough
    });
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
    renderer.setPixelRatio( window.devicePixelRatio );
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

    /*
     * Create OrbitControls.
     */
    //controls = new ThreeControls.OrbitControls(camera, renderer.domElement);


    new RGBELoader().load('/observer/map.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = texture;
        scene.environment = texture;
    });

    const bodyParts = [
        'Body',
        'Chair',
        'DoorHandleOne',
        'DoorHandleTwo',
        'DoorOne',
        'DoorTwo',
        'GrillOne',
        'GrillTwo',
        'LegFour',
        'LegOne',
        'LegThree',
        'LegTwo',
        'LightCaseOne',
        'LightCaseTwo',
        'LightOne',
        'LightTAwo',
        'SkiOne',
        'SkiTwo',
        'Tail',
        'TailEnd',
        'TailFin',
        'Window',
        'TopRoto',
        'TailRoto',
    ];

    const cloudParts = [
        'Clouds',
        'CloudsTwo'
    ];


    const loader = new GLTFLoader();
    loader.load(
        "/observer/chopper3.glb",
        function (gltf) {

            const bscene = gltf.scene;

            const body = new THREE.Group();
            bodyParts.forEach((part) => {
                const thisPart = gltf.scene.getObjectByName(part);
                thisPart.castShadow = true;
                thisPart.receiveShadow = true;
                body.add(thisPart);
            })

            body.position.y -= .5;

            const topRoto = body.getObjectByName('TopRoto');
            const tailRoto = body.getObjectByName('TailRoto');

            const clouds = new THREE.Group();
            cloudParts.forEach((part) => {
                clouds.add(gltf.scene.getObjectByName(part))
            })

            clouds.position.y += 3;
            clouds.scale.x += 3;
            clouds.scale.y += 3;
            clouds.scale.z += 3;

            const all = new THREE.Group();
            all.add(body);
            all.add(clouds);
            scene.add(all);

            gsap.set(body.rotation, {
                y: -1,
                x: 0
            });

            Observer.create({
                type: "wheel,touch,scroll,pointer",
                wheelSpeed: -1,
                onMove: (self) => {
                    body.rotation.y = gsap.utils.mapRange(
                        0, window.innerWidth,
                        -1.2, -.2,
                        self.x
                    );
                    body.rotation.x = gsap.utils.mapRange(
                        0, window.innerHeight,
                        -.5, .5,
                        self.y
                    );
                },
                tolerance: 10,
                preventDefault: true,
                debounce: true
            });

            gsap.to(body.position, {
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                y: `+=0.2`,
                x: `+=0.1`
            })

            gsap.to(clouds.rotation, {
                duration: 20,
                repeat: -1,
                ease: 'none',
                y: `-=${Math.PI * 2}`
            })

            gsap.to(topRoto.rotation, {
                duration: .3,
                repeat: -1,
                ease: 'none',
                y: `-=${Math.PI * 2}`
            })

            gsap.to(tailRoto.rotation, {
                duration: .3,
                repeat: -1,
                ease: 'none',
                x: `-=${Math.PI * 2}`
            })

        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    /*
     * Add ambient light to the scene
     */
    const light_color = new THREE.Color("hsl(220, 25%, 50%)");
    const ambient_light = new THREE.AmbientLight(light_color, 3);
    scene.add(ambient_light);

    /*
     * Add point-light to the scene
     */
    const sec_light_color = new THREE.Color("hsl(50, 25%, 50%)");
    const light = new THREE.PointLight(sec_light_color, 2, 100);
    light.position.set(-5, 3, 5);
    scene.add(light);
    //const lightHelper = new THREE.PointLightHelper( light, 1 );
    //scene.add( lightHelper );

    /*
     * Add point-light to the scene
     */

    const sec_light = new THREE.PointLight(light_color, 2, 100);
    sec_light.position.set(5, 3, -7);
    scene.add(sec_light);
    //const sec_lightHelper = new THREE.PointLightHelper( sec_light, 1 );
    //scene.add( sec_lightHelper );
};

const animate = () => {
    requestAnimationFrame(animate);
    render();
};

const render = () => {
    //composer.render();
    renderer.render(scene, camera);
};

init();
animate();