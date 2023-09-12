import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";

// Scene
const scene = new THREE.Scene()

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "orange",
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Light
const light = new THREE.PointLight(0xffffff, 60, 100);
// position x, y, z
light.position.set(0, 10, 10)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20;
scene.add(camera);


// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
 const controls = new OrbitControls(camera, canvas)

// Resize
window.addEventListener("resize", () => {

    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera 
    // Withought this the window will not automatically adjust to fill out the empty space i.e. white space
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()