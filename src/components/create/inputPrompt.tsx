import { FC } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const InputPrompt: FC = () => {
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const text = formData.get("user-text");

    console.log("Sending prompt " + text + "!");

    try {
      const response = await fetch(
        "https://autopilot-garlic.kro.kr/api/find-matching-avatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Load the GLTF model using Three.js
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
          const scene = new THREE.Scene();
          scene.add(gltf.scene);

          // Set up camera, renderer, and any other Three.js components here
          const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          camera.position.z = 5;

          const renderer = new THREE.WebGLRenderer();
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(renderer.domElement);

          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };

          animate();
        });
      } else {
        console.error("Failed to fetch GLTF file");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Removing prompt!");
  };

  return (
    <>
      <div className="mx-auto w-[90vw] md:w-[70vw] lg:w-[50vw] bg-gray-300/40 rounded-[12px] p-4">
        <h2 className="text-xl font hidden">3D Model and User Input</h2>

        <form className="my-1.5" onSubmit={handleFormSubmit}>
          <input
            id="user-text"
            name="user-text"
            type="text"
            placeholder="Enter your description"
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          />
          <input
            id="submit-button"
            type="submit"
            value="Submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default InputPrompt;
