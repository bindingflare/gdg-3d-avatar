import { FC, useState } from "react";

const InputPrompt: FC = () => {
  const [isVisible, setVisible] = useState(true);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisible(false);

    console.log("Removing prompt!")
  };

  return (
    <>
      <div className="w-full h-[300px] z-20 relative">
        <div className={`bg-gray-300/40 rounded-[12px] absolute top-0 w-full transition-all duration-500 ease-in-out ${isVisible? "max-h-[500px] opacity-100": "max-h-0 opacity-0 top-[-100px]"}`}>
          <div className="p-4">
            <h2 className="text-xl font hidden">3D Model and User Input</h2>

            <form className="my-1.5" onSubmit={handleFormSubmit}>
              <input
                id="user-text"
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
        </div>
      </div>
      <div id="three-container" className={`w-screen h-screen fixed top-[90px] bg-gray-300 z-10 transition-all ease-in-out duration-500 ${!isVisible? "opacity-100 pointer-events-auto": "opacity-0 pointer-events-none"}`}>
      </div>
    </>
  );
};

export default InputPrompt;
