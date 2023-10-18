import * as THREE from "https://unpkg.com/three@0.140.0/build/three.module.js";

const canvas = document.querySelector('#TD');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.render(scene,camera);