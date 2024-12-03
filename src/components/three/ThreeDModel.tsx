import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ThreeDModelProps {
  gltfUrl: string | null;
  setVisible: (visible: boolean) => void;
  setHeaderVisible: (headerVisible: boolean) => void;
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({
  gltfUrl,
  setVisible,
  setHeaderVisible,
}: ThreeDModelProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  // Function to center and position a model
  const centerAndPositionModel = (model: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const moveUpDistance = 1;
    model.position.y += moveUpDistance;

    const size = box.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);
    const scaleFactor = 3;
    model.scale.setScalar((1 / maxSize) * scaleFactor);
  };

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Load the default model
    const loader = new GLTFLoader();
    loader.load("/objects/dispenser.glb", (gltf: { scene: THREE.Scene }) => {
      const model = gltf.scene;
      scene.add(model);

      centerAndPositionModel(model);
      setupInitialCamera(camera, model);
      addLighting(scene);

      // Render loop
      animate();
    });

    // Function to setup initial camera
    const setupInitialCamera = (
      camera: THREE.PerspectiveCamera,
      model: THREE.Object3D
    ) => {
      const distance = 4;
      const zDistance = 10;
      const angle = Math.PI / 4;
      const angle2 = Math.PI / 7;

      camera.position.x = -distance * Math.sin(angle2);
      camera.position.y = distance * Math.sin(angle2);
      camera.position.z = zDistance * Math.cos(angle);

      camera.lookAt(model.position.add(new THREE.Vector3(1, 0, -1)));
    };

    // Function to add lighting
    const addLighting = (scene: THREE.Scene) => {
      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
    };

    // Render loop function
    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Add raycaster for detecting clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event: { clientX: number; clientY: number }) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        // Register hit, move onto prompt stage
        setHeaderVisible(true);

        const intersectedObject = intersects[0].object;
        const targetPosition = intersectedObject.position
          .clone()
          .add(new THREE.Vector3(1, 0, -1));

        gsap.to(camera.position, {
          delay: 1,
          duration: 1.5,
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z + 3,
          onUpdate: () => {
            camera.lookAt(targetPosition);
          },
          onComplete: () => {
            setVisible(true);
          },
        });
      }
    }

    window.addEventListener("click", onMouseClick);

    function onWindowResize() {
      // Update camera aspect ratio and projection matrix
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    
      // Update renderer size
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);

    // Clean up on unmount
    return () => {
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener("click", onMouseClick);
    };
  }, [setVisible, setHeaderVisible]);

  useEffect(() => {
    if (gltfUrl && sceneRef.current && cameraRef.current) {
      // Load the new model when gltfUrl changes
      const loader = new GLTFLoader();
      loader.load(gltfUrl, (gltf: { scene: THREE.Scene }) => {
        const newModel = gltf.scene;
        sceneRef.current!.add(newModel);
        modelRef.current = newModel;

        // Center and position the new model
        centerAndPositionModel(newModel);
        newModel.position.add(new THREE.Vector3(1, 0, 3));

        // Calculate the center of the new model for accurate camera focus
        const box = new THREE.Box3().setFromObject(newModel);
        const center = box.getCenter(new THREE.Vector3());

        // Smoothly pan the camera to the new model's position
        gsap.to(cameraRef.current!.position, {
          duration: 1.5,
          x: center.x + 2,
          y: center.y + 2,
          z: center.z + 5,
          onUpdate: () => {
            cameraRef.current!.lookAt(center);
          },
          onComplete: () => {
            startCircularAnimation(center);
          },
        });
      });
    }
  }, [gltfUrl]);

  const startCircularAnimation = (center: THREE.Vector3) => {
    const clock = new THREE.Clock();

    const animateCircularMotion = () => {
      requestAnimationFrame(animateCircularMotion);

      if (cameraRef.current && modelRef.current) {
        const elapsedTime = clock.getElapsedTime();

        // Calculate new camera position in a circular path
        const radius = 5; // Distance from the model
        const speed = 0.2; // Reduced speed for smoother motion

        // Use easing-like effect by modulating speed over time
        const angle = speed * elapsedTime + 70;
        const x = center.x + radius * Math.cos(angle);
        const z = center.z + radius * Math.sin(angle);

        // Set camera position and look at the model's center
        cameraRef.current.position.set(x, center.y + 2, z);
        cameraRef.current.lookAt(center);

        // Render the scene
        if (rendererRef.current) {
          rendererRef.current.render(sceneRef.current!, cameraRef.current!);
        }
      }
    };

    animateCircularMotion();
  };

  return <div className="z-10 absolute pointer-events-none" ref={mountRef} />;
};

export default ThreeDModel;
