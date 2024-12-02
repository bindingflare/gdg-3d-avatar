import { FC, MouseEventHandler, useState } from "react";
import Marquee from "react-fast-marquee";

interface GradientBackgroundProps {
  text: string;
}

const GradientBackground: FC<GradientBackgroundProps> = ({
  text,
}: GradientBackgroundProps) => {
  const [gradient, setGradient] = useState(
    "circle at 50% 10%, rgb(128, 40, 128), rgb(128, 214, 128)"
  );

  const speed = text.length > 20 ? 10 : 0;

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { innerWidth, innerHeight } = window;
    const xPercent = (e.clientX / innerWidth) * 100;
    const yPercent = (e.clientY / innerHeight) * 100;

    // Calculate RGB values based on cursor position
    const r1 = Math.round((xPercent / 100) * 255);
    const g1 = Math.round((yPercent / 100) * 255);
    const b1 = 128; // Fixed blue value for the first color

    const r2 = Math.round(((100 - xPercent) / 100) * 255);
    const g2 = Math.round(((100 - yPercent) / 100) * 255);
    const b2 = 128; // Fixed blue value for the second color

    // Create a radial gradient based on cursor position
    const newGradient = `circle at ${xPercent}% ${yPercent}%, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2})`;
    setGradient(newGradient);

    //console.log("Set gradient to " + newGradient + "!");
  };

  return (
    <div
      className={`w-screen h-screen absolute transition-colors duration-300`}
      style={{
        backgroundImage: `radial-gradient(${gradient})`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="text-white/25 text-center top-[70%] fixed w-full">
        {speed == 0 ? (
          <h1 className="text-7xl mx-auto italic font-semibold overflow-hidden text-nowrap">
            {text}
          </h1>
        ) : (
          <Marquee className="align-middle" speed={speed}>
            <h1 className="text-7xl mx-auto italic font-semibold overflow-hidden text-nowrap">
              {text}
            </h1>
          </Marquee>
        )}
      </div>
    </div>
  );
};

export default GradientBackground;
