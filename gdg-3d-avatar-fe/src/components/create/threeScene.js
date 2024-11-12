import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const container = document.getElementById('three-container');
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000);
camera.position.set(0, 7, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const boardHeight = 1;
const boardRadius = 5;
const boardGeometry = new THREE.CylinderGeometry(boardRadius, boardRadius, boardHeight, 64);
const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const board = new THREE.Mesh(boardGeometry, boardMaterial);
board.position.y = -boardHeight / 2;
scene.add(board);

const loader = new GLTFLoader();
let model;
let startAnimation = false;

// Default `.glb` file path for testing and fallback
const defaultGLBPath = "/models/fireman_suit.glb"; // Set this to your default `.glb` file path

function loadGLB(url) {
    console.log("Attempting to load model from URL:", url);
    loader.load(url, function (gltf) {
        if (model) {
            scene.remove(model);
            console.log("Removed previous model from scene.");
        }

        model = gltf.scene;
        model.scale.set(3, 3, 3);
        scene.add(model);
        startAnimation = true;
        console.log("Model successfully loaded and added to the scene.");
    }, undefined, function (error) {
        console.error("Error loading model:", error);
        console.log("Loading default model.");
        loader.load(defaultGLBPath, function (gltf) {
            model = gltf.scene;
            model.scale.set(3, 3, 3);
            scene.add(model);
            startAnimation = true;
        });
    });
}

// Initial load of the default model for testing
loadGLB(defaultGLBPath);

// Animate and render
function animate() {
    requestAnimationFrame(animate);

    if (startAnimation && model) {
        model.rotation.y += 0.02;
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

document.getElementById('submit-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-text').value;
    if (userInput) {
        try {
            const response = await fetch('https://autopilot-garlic.kro.kr/api/find-matching-avatar', {  // Corrected URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: userInput })
            });

            console.log("API response status:", response.status);
            if (response.ok) {
                console.log("Content-Type:", response.headers.get("Content-Type"));
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                console.log("Generated blob URL for model:", url);
                loadGLB(url);
            } else {
                console.error('Error fetching the model:', response.statusText);
                loadGLB(defaultGLBPath); // Fallback to default model on error
            }
        } catch (error) {
            console.error('Error:', error);
            loadGLB(defaultGLBPath); // Fallback to default model on network error
        }
    } else {
        loadGLB(defaultGLBPath); // Fallback to default if no input
    }
});