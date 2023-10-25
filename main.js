import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#TD');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
let mesh;
const loader = new GLTFLoader().setPath("./assets/r2-d2_animated/");
loader.load("scene.gltf", (gltfScene) => {
  //loadedModel = gltfScene
  mesh = gltfScene.scene;
  mesh.position.set(0, -0.5, 0)
  scene.add(mesh);
});

const light = new THREE.AmbientLight(0xeeeeee, 4);

scene.add(light);

camera.position.set(0, 0, 1);
light.position.set(0, 0, 1);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.005;
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.render(scene,camera);
};

animate();