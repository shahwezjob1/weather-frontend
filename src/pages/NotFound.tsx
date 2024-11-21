import React from "react";
import NotFoundSvg from "../assets/not_found.svg";

const NotFound = () => {
  return (
    <div className="flex justify-center flex-1 items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-2xl flex flex-col">
        <img src={NotFoundSvg} alt="Not Found" />
      </div>
    </div>
  );
};

export default NotFound;
