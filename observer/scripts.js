/*
 * ThreeJs.
 */
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/RGBELoader.js';

/*
 * Gsap and Observer plugin.
 */
import gsap from "https://cdn.skypack.dev/gsap@3.10.2";
import Observer from "https://cdn.skypack.dev/gsap@3.10.2/Observer";
gsap.registerPlugin(Observer);


let scene, camera, renderer, controls, composer;

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

    /*
     * Load Hdr Environment.
     */
    new RGBELoader().load('/observer/map.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = texture;
        scene.environment = texture;
    });

    /*
     * List all model parts.
     */
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

    /*
     * List all cloud parts.
     */
    const cloudParts = [
        'Clouds',
        'CloudsTwo'
    ];

    /*
     * Load Belder scene.
     */
    const loader = new GLTFLoader();
    loader.load(
        "/observer/chopper3.glb",
        function (gltf) {

            /*
             * Create group for the body.
             */
            const body = new THREE.Group();

            /*
             * Add all body parts to the new body group.
             */
            bodyParts.forEach((part) => {
                const thisPart = gltf.scene.getObjectByName(part);
                thisPart.castShadow = true;
                thisPart.receiveShadow = true;
                body.add(thisPart);
            })

            /*
             * Position the body.
             */
            body.position.y -= .5;

            /*
             * Get a ref to the roto parts.
             */
            const topRoto = body.getObjectByName('TopRoto');
            const tailRoto = body.getObjectByName('TailRoto');

            /*
             * Create a group for the clouds.
             */
            const clouds = new THREE.Group();

            /*
             * Add all cloud parts to the new clouds group.
             */
            cloudParts.forEach((part) => {
                clouds.add(gltf.scene.getObjectByName(part))
            })

            /*
             * Position and scale the clouds group.
             */
            clouds.position.y += 3;
            clouds.scale.x += 3;
            clouds.scale.y += 3;
            clouds.scale.z += 3;

            /*
             * Create a new group for all the parts.
             */
            const all = new THREE.Group();

            /*
             * Add all groups to the new all group.
             */
            all.add(body);
            all.add(clouds);

            /*
             * Add the all group to the scene.
             */
            scene.add(all);

            /*
             * Rotate the body group.
             */
            gsap.set(body.rotation, {
                y: -1,
                x: 0
            });

            /*
             * Listen for mouse movement and rotate the body.
             */
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

            /*
             * Add a hover animation to the body.
             */
            gsap.to(body.position, {
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                y: `+=0.2`,
                x: `+=0.1`
            })

            /*
             * Rotate the clouds group.
             */
            gsap.to(clouds.rotation, {
                duration: 20,
                repeat: -1,
                ease: 'none',
                y: `-=${Math.PI * 2}`
            })

            /*
             * Rotate the top roto blades.
             */
            gsap.to(topRoto.rotation, {
                duration: .3,
                repeat: -1,
                ease: 'none',
                y: `-=${Math.PI * 2}`
            })

            /*
             * Rotate the tail roto blades.
             */
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
     * Add ambient light to the scene.
     */
    const light_color = new THREE.Color("hsl(220, 25%, 50%)");
    const ambient_light = new THREE.AmbientLight(light_color, 3);
    scene.add(ambient_light);

    /*
     * Add point-light to the scene.
     */
    const sec_light_color = new THREE.Color("hsl(50, 25%, 50%)");
    const light = new THREE.PointLight(sec_light_color, 2, 100);
    light.position.set(-5, 3, 5);
    scene.add(light);

    /*
     * Add another point-light to the scene.
     */
    const sec_light = new THREE.PointLight(light_color, 2, 100);
    sec_light.position.set(5, 3, -7);
    scene.add(sec_light);
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