import { FC, useState } from "react";
import GradientBackground from "./gradientBg";
import ThreeDModel from "./three/ThreeDModel";
import InputPrompt from "./create/inputPrompt";

const SectionMain: FC = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [gltfUrl, setGltfUrl] = useState<string | null>(null);
  const [spoilerText, setSpoilerText] = useState<string>("Click Me!");

  const handleFormSubmit = async (text: string) => {
    setIsInputVisible(false);

    try {
      const response = await fetch(
        "https://autopilot-garlic.kro.kr/api/find-matching-avatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGltfUrl(url); // Store the URL in state
        setSpoilerText(`${text}~ ${text}!! ${text}.. ${text}? ${text}`);
      } else {
        console.error("Failed to fetch GLTF file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="relative">
        <ThreeDModel gltfUrl={gltfUrl} setVisible={setIsInputVisible} />
        <GradientBackground text={spoilerText} />
        <div className={`pt-[90px]`}>
          <div className="w-full h-[300px] z-10 relative">
            <div
              className={` absolute top-0 w-full transition-all duration-500 ease-in-out ${
                isInputVisible
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0 top-[-100px]"
              }`}
            >
              <InputPrompt onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionMain;
