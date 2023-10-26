import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//target dom element
const canvas = document.querySelector('#TD');

//define variables scene, camera, renderer, light etc
var mixer;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
const light = new THREE.AmbientLight(0xeeeeee, 4);
scene.add(light);

//set position
camera.position.set(0, 0, 1);
light.position.set(0, 0, 1);

function animate() {
  requestAnimationFrame(animate);
  const clock = new THREE.Clock();
  const dt = clock.getDelta();
  if (mixer) {
    mixer.update(dt);
  } else {
    console.log('pas de mixer');
  }
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.render(scene,camera);
};

//loader 3D object from sketchfab
const loader = new GLTFLoader();
loader.load("./assets/r2-d2_animated.glb", (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, -0.5, 0)
  mixer = new THREE.AnimationMixer(gltf.scene);
  const animation = gltf.animations[0];
  mixer.clipAction(animation).play();
  scene.add(mesh);
  animate();
});





