import React, { FC } from "react";
import Wrapper from "./wrapper";

const Header: FC = () => {
  return (
    <>
      <header className="fixed top-0 w-full bg-gray-800/50 text-white py-2 z-30">
        <Wrapper>
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold">3D-AVATAR</h2>
            </div>
            <nav>
              <ul className="flex space-x-4 list-none m-0 p-0">
                <li>
                  <a href="/" className="hover:text-gray-300">Home</a>
                </li>
                <li>
                  <a href="/create/" className="hover:text-gray-300">Create</a>
                </li>
                <li>
                  <a href="/credits/" className="hover:text-gray-300">Credits</a>
                </li>
              </ul>
            </nav>
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Header;