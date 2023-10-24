import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#TD');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});

const loader = new GLTFLoader();
loader.load("./assets/r2-d2_animated/scene.gltf", (gltfScene) => {
  //loadedModel = gltfScene
  scene.add(gltfScene.scene);
});

const light = new THREE.PointLight(0xeeeeee);

scene.add(light);

camera.position.set(0, 1.5, 4);
light.position.set(0, 4, 4);

renderer.setClearColor(0xffffff, 0);
renderer.render(scene,camera);

