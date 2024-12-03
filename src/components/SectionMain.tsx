import { FC, useEffect, useState } from "react";
import GradientBackground from "./gradientBg";
import ThreeDModel from "./three/ThreeDModel";
import InputPrompt from "./create/inputPrompt";
import Header from "./header";
import Wrapper from "./wrapper";

const SectionMain: FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [delayedHeaderVisible, setDelayedHeaderVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [gltfUrl, setGltfUrl] = useState<string | null>(null);
  const [spoilerText, setSpoilerText] = useState<string>("화면을 클릭하세요!");

  useEffect(() => {
    if (isHeaderVisible) {
      setSpoilerText("");

      const timeoutId = setTimeout(() => {
        setDelayedHeaderVisible(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setDelayedHeaderVisible(false);
    }
  }, [isHeaderVisible]);

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

        setIsResultVisible(true);
        setGltfUrl(url); // Store the URL in state
        setSpoilerText(
          text.length > 20
            ? `${text}`
            : `${text}~ ${text}!! ${text}.. ${text}? ${text}`
        );
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
        <Header isVisible={isHeaderVisible} />
        <ThreeDModel
          gltfUrl={gltfUrl}
          setVisible={setIsInputVisible}
          setHeaderVisible={setIsHeaderVisible}
        />
        <GradientBackground text={spoilerText} />
        <Wrapper>
          <div className="h-[5vh] pointer-events-none"></div>
          <div
            className={`w-full z-10 relative text-start pointer-events-none`}
          >
            <div
              className={`basic-animation ${
                isHeaderVisible  ? "opacity-0" : ""
              }`}
            >
              <h2 className="korean">텍스트로 뽑는 당신의 캐릭터 자판기, </h2>
              <div>
                <h2 className="text-7xl">Text to Avatar</h2>
              </div>
            </div>
            {isResultVisible ? (
              <></>
            ) : (
              <>
                <div
                  className={`basic-animation ${
                    delayedHeaderVisible  ? "mt-[10vh]" : "opacity-0"
                  }`}
                >
                  <h2 className="korean">간단한 텍스트를 입력해 나만의 캐릭터를 만들어보세요!</h2>
                </div>
                <div
                  className={`m-4 relative basic-animation top-0 ${
                    isInputVisible
                      ? "max-h-[33vh] opacity-100"
                      : "max-h-0 opacity-0 top-[-20vh]"
                  }`}
                >
                  <InputPrompt onSubmit={handleFormSubmit} />
                </div>
              </>
            )}
          </div>
        </Wrapper>
      </section>
    </>
  );
};

export default SectionMain;
