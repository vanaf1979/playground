// 1 - Create a scene.
const scene = new THREE.Scene();

// 2 - Create a camera.
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 65;

// 3 - Create a renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.size = 2048;


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})


controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

document.body.appendChild(renderer.domElement);

// 4 - Create a box geometry.
const bluegeometry = new THREE.BoxGeometry(54, 12.5, 2.5);

// 5 - Create the material for the cube object.
const bluematerial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(`hsl(222, 99%, 40%)`),
    transparent: false,
    opacity: 1
});

const whitematerial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(`hsl(222, 0%, 90%)`),
    transparent: false,
    opacity: 1
});

// 6 - Create the the cube object with the geometry and material.
const bluecube = new THREE.Mesh(
    bluegeometry,
    bluematerial
);
bluecube.castShadow = true;
bluecube.receiveShadow = true;
bluecube.position.y = 13.5;
bluecube.position.x = 2;
bluecube.rotation.x = 0;
bluecube.rotation.y = 0;
bluecube.rotation.z = 0;
//scene.add( bluecube );

const whitegeometry = new THREE.BoxGeometry(81, 12.5, 2.5);
const whitecube = new THREE.Mesh(
    whitegeometry,
    whitematerial
);
whitecube.castShadow = true;
whitecube.receiveShadow = true;
whitecube.position.y = 0;
whitecube.position.x = 15.5;
whitecube.position.z = 0
whitecube.rotation.x = 0;
whitecube.rotation.y = 0;
whitecube.rotation.z = 0;
//scene.add( whitecube );

const whitetwogeometry = new THREE.BoxGeometry(52, 12.5, 2.5);
const whitetwocube = new THREE.Mesh(
    whitetwogeometry,
    whitematerial
);
whitetwocube.castShadow = true;
whitetwocube.receiveShadow = true;
whitetwocube.position.y = -13.5
whitetwocube.position.x = 1
whitetwocube.position.z = 0
whitetwocube.rotation.x = 0;
whitetwocube.rotation.y = 0;
whitetwocube.rotation.z = 0;
//scene.add( whitetwocube );

const boards = new THREE.Group()
boards.add(bluecube)
boards.add(whitecube)
boards.add(whitetwocube)


function loadFont() {
    var loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (res) {
        font = res;
        createText();
    });
}

function createText() {

    var cubeWhite = new THREE.MeshLambertMaterial({color: 0xffffff})

    stephanGeo = new THREE.TextGeometry('Stephan Nijman', {
        font: font,
        size: 4,
        height: 0.5,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelSegments: 2
    });

    var stephText = new THREE.Mesh(stephanGeo, cubeBlack)
    stephText.position.x = -20;
    stephText.position.y = 11.5;
    stephText.position.z = 2.5;
    stephText.castShadow = true;

    boards.add(stephText)


    var cubeBlack = new THREE.MeshLambertMaterial({color: 0x111111})

    webDevGeo = new THREE.TextGeometry('Web Dev Tips & Tutorials', {
        font: font,
        size: 4,
        height: 0.5,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelSegments: 2
    });

    var webDevText = new THREE.Mesh(webDevGeo, cubeBlack)
    webDevText.position.x = -20;
    webDevText.position.y = -1.5;
    webDevText.position.z = 2.5;
    webDevText.castShadow = true;

    boards.add(webDevText)


    sinceGeo = new THREE.TextGeometry('Since1979.dev', {
        font: font,
        size: 4,
        height: 0.5,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelSegments: 2
    });

    var sinceText = new THREE.Mesh(sinceGeo, cubeBlack)
    sinceText.position.x = -20;
    sinceText.position.y = -14.5;
    sinceText.position.z = 2.5;
    sinceText.castShadow = true;

    boards.add(sinceText)
};

loadFont();

boards.position.x = -10;
boards.rotation.x = 0.3;
boards.rotation.y = -0.5;
boards.rotation.z = 0;

scene.add(boards);


// 7 - Create a pointlight
const point_color = new THREE.Color('hsl(222, 99%, 100%)')
const light = new THREE.PointLight(point_color, 1)
light.position.set(10, 5, 25)
light.castShadow = true;
scene.add(light)

// 8 - Create a ambiebt light.
const ambient_color = new THREE.Color('hsl(222, 99%, 90%)')
const ambient_light = new THREE.AmbientLight(ambient_color)
scene.add(ambient_light);


// 9 - Animat the cube
const animate = function () {
    requestAnimationFrame(animate);
    //bluecube.rotation.x += 0.005;
    //boards.rotation.y += 0.005;
    //bluecube.rotation.z += 0.005;
    renderer.render(scene, camera);
};
animate();

var hover = gsap.timeline({
    repeat: -1,
    yoyo: true
})
    .to(boards.rotation, {
        duration: 8,
        y: 0.5,
        x: -0.3
    })