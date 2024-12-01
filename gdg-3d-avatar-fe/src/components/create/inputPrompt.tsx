import { FC, useState } from "react";

const InputPrompt: FC = () => {
  const [isVisible, setVisible] = useState(true);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisible(false);

    console.log("Removing prompt!");
  };

  return (
    <>
      <div className="mx-auto w-[90vw] md:w-[70vw] lg:w-[50vw] bg-gray-300/40 rounded-[12px] p-4">
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
    </>
  );
};

export default InputPrompt;
