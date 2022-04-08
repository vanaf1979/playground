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
    camera.position.set(0, 5.6, 5);

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
    new RGBELoader().load('/cop-car/map.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        //scene.background = texture;
        scene.environment = texture;
    });

    /*
     * Add point-light to the scene.
     */
    const blue_light_color = new THREE.Color("hsl(220, 100%, 50%)");
    const blue_light = new THREE.PointLight(blue_light_color, 0, 30);
    blue_light.position.set(-.5, 5.2, 1.7);
    //scene.add(light);
    //const lightHelper = new THREE.PointLightHelper( light, 1 );
    //scene.add( lightHelper );

    /*
     * Add another point-light to the scene.
     */
    const red_light_color = new THREE.Color("hsl(0, 100%, 50%)");
    const red_light = new THREE.PointLight(red_light_color, 7, 30);
    red_light.position.set(.5, 5.2, 1.7);
    //scene.add(sec_light);
    //const sec_lightHelper = new THREE.PointLightHelper( sec_light, 1 );
    //scene.add( sec_lightHelper );

    /*
    * Add another point-light to the scene.
    */
    const yellow_light_color = new THREE.Color("hsl(200, 50%, 80%)");
    const front_light = new THREE.PointLight(yellow_light_color, 6, 100);
    front_light.position.set(0, 5.5, -.2);
    //scene.add(front_light);
    //const sec_lightHelper = new THREE.PointLightHelper( sec_light, 1 );
    //scene.add( sec_lightHelper );

    /*
     * Load Belder scene.
     */
    const loader = new GLTFLoader();
    loader.load(
        "/cop-car/road.glb",
        function (gltf) {

            const road = gltf.scene.getObjectByName('Road');
            const copcar = gltf.scene.getObjectByName('Car');

            const car = new THREE.Group();
            car.add(copcar);
            car.add(front_light);
            car.add(blue_light);
            car.add(red_light);

            /*
             * Add the all group to the scene.
             */
            scene.add(road);
            scene.add(car);

            /*
             * Listen for mouse movement and rotate the body.
             */
            Observer.create({
                type: "wheel,touch,scroll,pointer",
                wheelSpeed: -1,
                onMove: (self) => {
                    car.position.x = gsap.utils.mapRange(
                        0, window.innerWidth,
                        -.95, .95,
                        self.x
                    );
                    car.rotation.y = gsap.utils.mapRange(
                        0, window.innerWidth,
                        -.2, .2,
                        self.x
                    );
                },
                tolerance: 10,
                preventDefault: true,
                debounce: true
            });

            /*
             * Rotate the clouds group.
             */
            gsap.to(road.rotation, {
                duration: 15,
                repeat: -1,
                ease: 'none',
                x: `+=${Math.PI * 2}`,
            })

            /*
             * Rotate the top roto blades.
             */
            gsap.to(car.position, {
                duration: .7,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                y: `+=${Math.PI * .004}`
            })

            /*
             * Rotate the tail roto blades.
             */
            gsap.to(blue_light, {
                duration: .2,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                intensity: 7
            })

            gsap.to(red_light, {
                duration: .2,
                repeat: -1,
                yoyo: true,
                ease: 'none',
                intensity: 0
            })

        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

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