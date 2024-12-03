import Wrapper from "./components/wrapper";
import Header from "./components/header";
import Footer from "./components/footer";
import GradientBackground from "./components/gradientBg";

function Create() {
  return (
    <>
      <Header isVisible={true} />
      {/* <div
        id="three-container"
        className="w-screen h-screen fixed top-[90px] bg-gray-200 mx-auto rounded-[16px]"
      ></div> */}
      <div id="main" className="fixed w-screen h-screen">
        <GradientBackground text={"Welcome the TEAM"} />
      </div>
      <div className="pt-[90px]">

      </div>
      <Wrapper>
        <div className="z-10 font-korean">
          <h2 className="font-english my-8">Made by:</h2>
          <ul>
            <li>정준우</li>
            <li>백승우</li>
            <li>방준현</li>
            <li>이창연</li>
          </ul>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Create;
