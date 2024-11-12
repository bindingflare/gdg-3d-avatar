import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import GradientBackground from "./components/gradientBg";

function App() {
  return (
    <>
      <Header />
      <div id="main" className="absolute w-screen h-screen">
        <GradientBackground />
      </div>
      <div className="w-full lg:w-[70%] pt-[95px] h-screen m-auto bg-transparent z-10">
        <div className="w-[300px] flex flex-row m-auto justify-between">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <div>
          <p className="text-white text-2xl">Main page TODO</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
