// 1 - Create a scene.
const scene = new THREE.Scene();

// 2 - Create a camera.
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 150;

// 3 - Create a renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 4 - Add the renderer to the cocument
document.body.appendChild(renderer.domElement);

// 5 - Update renderer on window resize.
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

// 6 - Add orbit controls to make the scene interactive.
controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);


const config = {
    width: 10,
    height: 10,
    depth: 10,
    columns: 10,
    rows: 10,
    gap: 15
}

// 7 - Create a box geometry.
const bluegeometry = new THREE.BoxGeometry(
    config.width,
    config.height,
    config.depth
);

// const spere = new THREE.DodecahedronGeometry(10, 5);

// 8 - Create the material for the cube object.
const bluematerial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(`hsl(222, 50%, 40%)`),
    transparent: false,
    opacity: 1
});

const whitematerial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(`hsl(222, 50%, 60%)`),
    transparent: false,
    opacity: 1
});

const boards = new THREE.Group();

const initX = 0 - ((config.gap * (config.columns - 1)) + (config.width * config.columns)) / 2;
const initY = initX;

for (let stepX = 0; stepX < config.columns; stepX++) {

    const setX = initX + ((stepX * config.width) + (stepX * config.gap));

    for (let stepY = 0; stepY < config.rows; stepY++) {

        const odd = Math.floor(Math.random() * 2)

        const hue = Math.floor(Math.random() * 360)

        const bluematerial = new THREE.MeshLambertMaterial({
            color: new THREE.Color(`hsl(${hue}, 50%, 50%)`),
            transparent: false,
            opacity: 1
        });


        const mat = odd == 1 ? bluematerial : bluematerial;

        const setY = initY + ((stepY * config.height) + (stepY * config.gap));
        const setZ = -100 + Math.floor(Math.random() * 200);
        //const setZ = 0;

        const bluecube = new THREE.Mesh(
            bluegeometry,
            mat
        );

        bluecube.castShadow = true;
        bluecube.receiveShadow = true;
        bluecube.position.x = setX;
        bluecube.position.y = setY;
        bluecube.position.z = setZ;
        boards.add(bluecube);

    }

}


// 9 - Create a mesh from the geometry and material.


// 10 - Create a group and add the cube mesh to it
// boards.add(bluecube);
boards.position.x = 0;
boards.rotation.x = 5.2;
boards.rotation.y = 3;
boards.rotation.z = 0.7;

// 11 - Ad the group to the scene.
scene.add(boards);

// 12 - Create a pointlight
const point_color = new THREE.Color('hsl(222, 99%, 100%)')
const light = new THREE.PointLight(point_color, 1)
light.position.set(10, 5, 25)
light.castShadow = true;
scene.add(light)

const lighttwo = new THREE.PointLight(point_color, 1)
lighttwo.position.set(10, 5, -60)
lighttwo.castShadow = true;
scene.add(lighttwo)

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
var hover = gsap.timeline({
    repeat: -1,
    yoyo: true
})
    .to(boards.rotation, {
        duration: 15,
        y: 0.5,
        x: -0.3
    });
