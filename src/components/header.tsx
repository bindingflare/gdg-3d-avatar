import { FC } from "react";
import Wrapper from "./wrapper";
import logo from '../assets/3d-avatar-logo.svg';

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
            <div className="flex items-center">
              <img src={logo} alt="Logo" width={50} height={50} />
              <h2 className="text-lg font-bold px-2">3D AVATAR</h2> 
            </div>
            <nav>
              <ul className="flex space-x-4 list-none">
                <li>
                  <a
                    href="/"
                    className="font-korean font-bold pointer-events-auto"
                  >
                    다시시작
                  </a>
                </li>
                <li>
                  <a
                    href="/create/"
                    className="font-korean font-bold pointer-events-auto"
                  >
                    크레딧
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
