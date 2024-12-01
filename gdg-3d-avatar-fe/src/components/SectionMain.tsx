import { FC } from "react";
import GradientBackground from "./gradientBg";
import ThreeDModel from "./three/ThreeDModel";

const SectionMain: FC = () => {
  return (
    <>
      <section className="relative">
        <ThreeDModel />
        <GradientBackground />
      </section>
    </>
  );
};

export default SectionMain;
