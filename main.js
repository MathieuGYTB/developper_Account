import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//target dom element
const canvas = document.querySelector('#TD');

//define variables scene, camera, renderer, light etc
var mixer;
var mesh;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});

//set position
camera.position.set(0, 0.6, 1.5);
camera.rotateX(50);

//create orbit controller
const controls = new OrbitControls( camera, canvas );
controls.update();

//create light
const light = new THREE.PointLight(0xeeeeee, 40);
light.position.set(0, 0.6, 1.5);
light.rotateX(50);

camera.add(light);
scene.add(camera);

//function to resize renderer
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;
const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
renderer.setSize(width, height, false);
  }
  return needResize;
}

//create a clock
const clock = new THREE.Clock(); 

//function to animate the model
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  if (mixer) {
    mixer.update(dt);
  } else {
    console.log('pas de mixer');
  }
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(devicePixelRatio);
  controls.update();
  renderer.render(scene,camera);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}
};

//loader 3D object from sketchfab
const loader = new GLTFLoader();
loader.load("./assets/r2-d2_animated.glb", (gltf) => {
  mesh = gltf.scene;
  mesh.position.set(0, -0.5, 0);
  scene.add(mesh);
  mixer = new THREE.AnimationMixer(mesh);
  const animation = gltf.animations[0];
  mixer.clipAction(animation).play();
  animate();
});





