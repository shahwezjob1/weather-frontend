import React from "react";
import SearchBox from "./SearchBox";
import { APP_NAME } from "../utils/constants";
interface NavBarProps {
  handleChangeCity: (name: string) => void; // handleChangeCity is a function
}

const NavBar: React.FC<NavBarProps> = ({ handleChangeCity }) => {
  return (
    <div id="NavBar" className="bg-blue-400 py-5 flex justify-center px-3">
      <div className="container flex justify-between  items-center w-full max-w-lg sm:max-w-2xl ">
        <h2 className="font-semibold sm:text-2xl text-slate-100">{APP_NAME}</h2>
        <SearchBox handleChangeCity={handleChangeCity} />
      </div>
    </div>
  );
};

export default NavBar;
