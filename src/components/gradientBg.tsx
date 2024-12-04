import { FC, MouseEventHandler, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Wrapper from "./wrapper";

interface GradientBackgroundProps {
  text: string;
}

const GradientBackground: FC<GradientBackgroundProps> = ({
  text,
}: GradientBackgroundProps) => {
  const [gradient, setGradient] = useState(
    "circle at 50% 10%, rgb(128, 40, 128), rgb(128, 214, 128)"
  );
  const [isTextVisible, setTextVisible] = useState(false);
  const [isMarqueeVisible, setMarqueeVisible] = useState(false);

  useEffect(() => {
    if (text.length > 20) {
      console.log("Showing marquee text");
      setTextVisible(false);
      setMarqueeVisible(true);
    } else if (text.length == 0) {
      console.log("Hiding text");
      setTextVisible(false);
      setMarqueeVisible(false);
    } else {
      console.log("Showing text");
      setTextVisible(true);
      setMarqueeVisible(false);
    }
  }, [text]);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { innerWidth, innerHeight } = window;
    let xPercent = (e.clientX / innerWidth) * 100;
    let yPercent = (e.clientY / innerHeight) * 100;

    // Limit percent if between 50~55%
    if (xPercent >= 45 && xPercent <= 55) {
      xPercent = xPercent <= 50 ? 45 : 55;
    }

    if (yPercent >= 45 && yPercent <= 55) {
      yPercent = yPercent <= 50 ? 45 : 55;
    }

    // Calculate RGB values based on cursor position
    const r1 = Math.round((xPercent / 100) * 255);
    const g1 = 80;
    const b1 = Math.round((yPercent / 100) * 255);
    const r2 = Math.round(((100 - xPercent) / 100) * 255);
    const g2 = 80;
    const b2 = Math.round(((100 - yPercent) / 100) * 255);

    // Create a radial gradient based on cursor position
    const newGradient = `circle at ${xPercent}% ${yPercent}%, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2})`;
    setGradient(newGradient);

    //console.log("Set gradient to " + newGradient + "!");
  };

  return (
    <div
      className={`w-screen h-screen transition-colors duration-300`}
      style={{
        backgroundImage: `radial-gradient(${gradient})`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="text-white/25 md:mt-[75vh] text-center md:fixed w-full">
        <div className="max-md:h-[75vh]" />
        <Wrapper>
          <div
            className={`opacity-animation relative min-h-[15vh] min-w-full ${
              isTextVisible ? "" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl italic font-semibold">{text}</h2>
          </div>
          <div
            className={`opacity-animation absolute md:top-0 min-h-[15vh] max-w-full ${
              isMarqueeVisible ? "" : "opacity-0"
            }`}
          >
            <Marquee autoFill={true} speed={30}>
              <h2 className="text-7xl italic font-semibold overflow-hidden text-nowrap min-h-[15vh]">
                {text}
              </h2>
            </Marquee>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default GradientBackground;
