import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeDModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xFFFFFF);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    // renderer.setClearColor( 0xFFFFFF, 0 );

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load("/objects/dispenser.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Move the model up
      const moveUpDistance = 2; // Adjust this value as needed
      model.position.y += moveUpDistance;

      // Optional: Scale the model if needed
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);
      const scaleFactor = 3; // Adjust this factor as needed
      model.scale.setScalar((1 / maxSize) * scaleFactor);

        // Position the camera
        const distance = 5; // Distance from the center
        const angle = Math.PI / 4; // 45 degrees in radians
        const angle2 = Math.PI / 7; // 180/7 degrees in radians

        camera.position.x = -distance * Math.sin(angle2); // Left
        camera.position.y = distance * Math.sin(angle2); // Up
        camera.position.z = distance * Math.cos(angle); // Forward

        // Make the camera look at the center of the scene
        camera.lookAt(center);

      const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
      scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      // Render loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });

    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="z-10 absolute pointer-events-none" ref={mountRef} />;
};

export default ThreeDModel;
