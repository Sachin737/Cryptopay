import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

import logo from "../images/logo.png";

const NavItem = ({ title, classes }) => {
  return <li className={`mx-4 cursor-pointer ${classes}`}>{title}</li>;
};

const navList = ["Market", "Exchange", "Tutorial", "Wallet"];

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex justify-between md:justify-center items-center p-4">
      <div className="md:flex-[0.5] flex-initial items-center justify-center mt-3">
        <img src={logo} alt="Logo" className="w-48 cursor-pointer" />
      </div>
      <ul className="text-white md:flex  hidden list-none flex-row justify-between items-center flex-initial">
        {navList.map((item, index) => (
          <NavItem key={index} title={item} />
        ))}
        <li className="bg-[#6621dcf4] py-2 px-7 mx-4 cursor-pointer hover:bg-[#6721dcbf] rounded-full">
          login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={32}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          ></AiOutlineClose>
        ) : (
          <HiMenuAlt4
            fontSize={32}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          ></HiMenuAlt4>
        )}
        {toggleMenu && (
          <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in ">
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                onClick={() => setToggleMenu(false)}
              ></AiOutlineClose>
            </li>
            {navList.map((item, index) => (
              <NavItem key={index} classes="my-2 text-lg" title={item} />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
