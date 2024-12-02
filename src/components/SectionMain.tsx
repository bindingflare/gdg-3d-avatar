import { FC, useState } from "react";
import GradientBackground from "./gradientBg";
import ThreeDModel from "./three/ThreeDModel";
import InputPrompt from "./create/inputPrompt";

const SectionMain: FC = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [gltfUrl, setGltfUrl] = useState<string | null>(null);

  return (
    <>
      <section className="relative">
        <ThreeDModel setVisible={setIsInputVisible} />
        <GradientBackground />
        <div className={`pt-[90px]`}>
          <div className="w-full h-[300px] z-20 relative">
            <div
              className={` absolute top-0 w-full transition-all duration-500 ease-in-out ${isInputVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 top-[-100px]"}`}
            >
              <InputPrompt />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionMain;
