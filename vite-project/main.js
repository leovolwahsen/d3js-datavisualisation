import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";

// Scene
const scene = new THREE.Scene()

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "orange",
    roughness: 0.6
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Light
const light = new THREE.PointLight(0xffffff, 100, 100);
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
renderer.setPixelRatio(2)
renderer.render(scene, camera);

// Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true
 controls.enablePan = false
 controls.enableZoom = false
 controls.autoRotate = true
 controls.autoRotateSpeed = 4

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
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()

// Timeline
const tl = gsap.timeline( {defaults: {
    duration: 1
} })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0}, { z: 1, x: 1, y: 1 })
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 })

// Mouse animation color change
let mouseDown = false
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseUp = false))

window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255), 
            Math.round((e.pageY / sizes.height) * 255),
            150, 
        ]
        // See values in array for color in console: 
        // console.log(rgb)

        // Animation using Array values for color rgb values:
        // FYI: rgb[0] to get red value of number does not work so we have to use new THREE.Color way to make it work
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g, 
            b: newColor.b
        })
    }
})