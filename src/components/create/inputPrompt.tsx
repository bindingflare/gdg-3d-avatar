import { FC, SetStateAction, useState } from "react";

interface InputPromptProps {
  onSubmit: (description: string) => void;
}

const InputPrompt: FC<InputPromptProps> = ({ onSubmit }: InputPromptProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const description = formData.get("user-text") as string;

    if (description) {
      onSubmit(description);
    } else {
      console.error("Description is null or empty");
    }
  };

  return (
    <>
      <div className="w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[800px] rounded-[12px] text-center">
        <h2 className="text-xl font hidden">3D Model and User Input</h2>

        <form className="my-4 pointer-events-none" onSubmit={handleFormSubmit}>
          <input
            id="user-text"
            name="user-text"
            type="text"
            value={inputValue}
            placeholder="캐릭터의 대사, 외향, 성격을 자유롭게 입력할 수 있어요..."
            className="prompt-input pointer-events-auto"
            onChange={handleInputChange}
          />
          <input
            id="submit-button"
            type="submit"
            value="만들기"
            className={`prompt-button ${
              inputValue.length > 0 ? "opactiy-100 pointer-events-auto" : "opacity-0"
            }`}
          />
        </form>
      </div>
    </>
  );
};

export default InputPrompt;
