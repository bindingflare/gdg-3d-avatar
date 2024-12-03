import { FC } from "react";
import Wrapper from "./wrapper";

interface HeaderProps {
  isVisible: boolean;
}

const Header: FC<HeaderProps> = ({ isVisible }: HeaderProps) => {
  return (
    <>
      <div
        className={`header ${isVisible ? "" : "opacity-0"}`}
      >
        <Wrapper>
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-lg font-bold">3D-AVATAR</h2>
            </div>
            <nav>
              <ul className="flex space-x-4 list-none">
                <li>
                  <a
                    href="/"
                    className="hover:text-gray-300 pointer-events-auto"
                  >
                    Start Over
                  </a>
                </li>
                <li>
                  <a
                    href="/create/"
                    className="hover:text-gray-300 pointer-events-auto"
                  >
                    Credits
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
