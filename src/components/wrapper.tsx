// src/wrapper.js
import React, { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className="text-center justify-center w-[1300px] max-w-full sm:max-w-[90vw] md:max-w-[70vw] flex flex-col items-center mx-auto gap-4 py-5">{children}</div>;
};

export default Wrapper;
