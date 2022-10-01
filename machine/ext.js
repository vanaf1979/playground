import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import {RGBELoader} from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/RGBELoader.js';

// Create a scene
export const initScene = () => {
    //scene.background = new THREE.Color(`hsl(0, 0%, 5%)`);
    return new THREE.Scene();
}

// Create a camera
export const initCamera = (width, height) => {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.aspect = width / height
    camera.position.z = 75;
    camera.position.x = -10;
    camera.lookAt(0, 0, 0);
    return camera;
}

// Create a renderer
export const initRender = (width, height) => {
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        autoClear: false,
        shadowMap: {
            enabled: false,
            type: THREE.PCFSoftShadowMap
        }
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    return renderer;
}

// Create a point light
export const makePointLight = (color = 'hsl(222, 99%, 90%)', strength = 3) => {
    const point_color = new THREE.Color(color)
    const light = new THREE.PointLight(point_color, strength)
    light.castShadow = true;
    return light;
}

// Create a ambient light
export const makeAmbientLight = (color = 'hsl(222, 99%, 90%)', strength = 3) => {
    const ambient_color = new THREE.Color(color);
    return new THREE.AmbientLight(ambient_color, strength);
}