// import all thing from thee.js in one object named THREE
import * as THREE from "three";
// to add mobility to the  camera
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import everything from the module dat.gui
import * as dat from "dat.gui";

// used to add 3d object taken from blender
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// import the image that i will use it as background
import stars from "./imgs/stars.jpg";
import goemetry from "./imgs/geomety.jpg";
import goemetric from "./imgs/geometric.jpg";

const monkeyUrl = new URL("./assets/monkey.glb", import.meta.url);

// container that display the animate
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true; // ### to enable the shadow in three.js ### //

// the siz of the container
renderer.setSize(window.innerWidth, window.innerHeight);

// adding the container into the body of document
document.body.appendChild(renderer.domElement);

// creating the scene
const scene = new THREE.Scene();

// creating the perspective camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// an instance of the orbit controls
const orbit = new OrbitControls(camera, renderer.domElement); // wee need to pass the camera and the renderer dom element as arguments

// adding an axes helper
const axesHelper = new THREE.AxesHelper(5); // 5 represents the length of axes

// adding axes helper to the scene
scene.add(axesHelper);

// camera.position.z = 5;
camera.position.set(-40, 50, 40);
// we need to call the update method every time we change the position of the camera (very important)
orbit.update();

// adding an box to the scene
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // ******* MeshBasicMaterial isn't affected by the light ******* //
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  // *#* MeshStandardMaterial is affected by the light, and and maybe al other *#* //
  color: 0xffffff,
  side: THREE.DoubleSide, // this to make bback face appearing
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// rotation the plane
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true; // the plane receives the shadow

// adding grid helper
const gridHelper = new THREE.GridHelper(30, 10); // the first argument for dimantion of grid helper and the second for divid the grid
scene.add(gridHelper);

// while we increase the number of Meridians and latitudes, we increase the spherical ball
const sphereGeometry = new THREE.SphereGeometry(5, 50, 50); // the first argument is for diameter length andd the second for number of Meridians and the third is for number of latitudes
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x9400ff,
  wireframe: true, //change the cover to grid or to surface
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// change the position of the sphere
sphere.position.set(-10, 10, 0);
sphere.castShadow = true; // the sphere cast the shadow

// create the light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Diraction light //

// const directionLight = new THREE.DirectionalLight(0xffffff, 0.8); // the second argument represent the intensity of the light
// scene.add(directionLight);
// directionLight.position.set(-30, 50, 0); // to change the position of the source of the light
// directionLight.castShadow = true; // the diraction light cast the shadow //
// directionLight.shadow.camera.bottom = -12; // to change the position of the bottom segment of the shadow camera

// const dLightHelper = new THREE.DirectionalLightHelper(directionLight, 5); // the first argument is the direction light and the second is the size of the squere
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionLight.shadow.camera); // the argument is the shadow camera for adding the camera helper
// scene.add(dLightShadowHelper);

// Diraction light //

// Spot Light //

const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.15;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// Spot Light //

// adding a fog
// scene.fog = new THREE.Fog(0xffffff, 0, 200);
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);

// changge the black background
// renderer.setClearColor(0xff33aa);

//adding an img to the backgroud
const textureLoader = new THREE.TextureLoader(); // in this method the background looks 2d
// scene.background = textureLoader.load(goemetric);

const cubeTextureLoader = new THREE.CubeTextureLoader(); // in this method the background looks 3d
scene.background = cubeTextureLoader.load([
  // the img have to be square
  goemetric,
  goemetric,
  goemetric,
  goemetric,
  goemetric,
  goemetric,
]);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
  // color: 0x00ff00,
  map: textureLoader.load(goemetry),
});
const box2MultiMaterial = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(goemetry) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(goemetry) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(goemetric) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(goemetric) }),
];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10); // the third argument for number of the horizon segments and fourth for vertical segments
const plane2Material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

// set a random position of the 3 first points
plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length - 1; // the value of the z position of the last point
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random(); // set a random value

// an example for vertex shader and fragment shader
const sphere2Geometry = new THREE.SphereGeometry(4);

// verex shader code
const vShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
  }
`;

// fragment shader code
const fShader = `
  void main() {
    gl_FragColor = vec4 (0.5, 0.5, 1.0, 1.0);
  }
`;

const sphere2Material = new THREE.ShaderMaterial({
  // vertexShader: document.getElementById("vertexShader").textContent,
  // fragmentShader: document.getElementById("fragmentShader").textContent,
  vertexShader: vShader,
  fragmentShader: fShader,
  wireframe: true,
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

// Add monkey from blender
const assetLoader = new GLTFLoader();
assetLoader.load(
  monkeyUrl.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 10);
  },
  undefined,
  function (err) {
    console.log(err);
  }
);

// creating an instance of gui class
const gui = new dat.GUI();

// we want to change the color,this is the object that we can hold the interface elements the color of the sphere
const options = {
  sphereColor: "#9400ff",
  wireframe: true,
  speed: 0.02,
  angle: 0.05,
  penumbra: 0,
  intensity: 1,
  xpos: -100,
  ypos: 100,
  zpos: 0,
};

// to add the color palette
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e); //e represent the color that I choose from color palette , an when I change the color I put the new color as sphere's color
});

// we will creatre an chekbox when we click on it the wireframe mode will turn on
gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});

// we want to make the sphere bounce an we want to have a slider to control the bouncing speed

// the slide that control the sppeed
gui.add(options, "speed", 0, 0.1);

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);
gui.add(options, "xpos", -200, 200);
gui.add(options, "ypos", -200, 200);
gui.add(options, "zpos", -200, 200);

let step = 0;

// to select object from the scene
const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", function (e) {
  mousePosition.x = (e.clientX / this.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / this.innerHeight) * 2 + 1;
});
const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = "theBox";

function animate(time) {
  //the time parameter represent the curent time in milliseconds, thats because i use three.js
  // rotation the box
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  sphere.rotation.y = -time / 1000;
  sphere.rotation.z = time / 1000;

  // the bounce of sphere
  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step)) + 5;

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  spotLight.position.set(options.xpos, options.ypos, options.zpos);
  sLightHelper.update();

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  console.log(intersects);

  // make an animation whene i hover on element
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === sphereId)
      intersects[i].object.material.color.set(0xff0000);
    if (intersects[i].object.name === "theBox") {
      intersects[i].object.rotation.x = time / 1000;
      intersects[i].object.rotation.y = time / 1000;
      intersects[i].object.rotation.y = time / 1000;
    }
  }

  // animation for change the position of the points by random
  plane2.geometry.attributes.position.array[0] = 10 * Math.random();
  plane2.geometry.attributes.position.array[1] = 10 * Math.random();
  plane2.geometry.attributes.position.array[2] = 10 * Math.random();
  plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
  plane2.geometry.attributes.position.needsUpdate = true;

  // link the scene with the camera
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
