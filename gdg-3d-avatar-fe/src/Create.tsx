import Wrapper from "./components/wrapper";
import Header from "./components/header";
import Footer from "./components/footer";
import GradientBackground from "./components/gradientBg";

function Create() {
  return (
    <>
      <Header />
      {/* <div
        id="three-container"
        className="w-screen h-screen fixed top-[90px] bg-gray-200 mx-auto rounded-[16px]"
      ></div> */}
      <div id="main" className="fixed w-screen h-screen">
        <GradientBackground />
      </div>
      <div className="pt-[90px]">

      </div>
      <Wrapper>
        <div id="three-container" className={`w-screen h-screen fixed top-[90px] bg-gray-300 z-10 transition-all ease-in-out duration-500 pointer-events-auto`}>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Create;
