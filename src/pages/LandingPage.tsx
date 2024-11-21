import React from "react";
import AddLocation from "../assets/add_location.svg";

const LandingPage = () => {
  return (
    <div className="flex justify-center flex-1 items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-2xl flex flex-col">
        <span className="italic text-base sm:text-lg text-right w-full">
          Please <span className="font-semibold">Search</span> your city to
          continue.
        </span>
        <img src={AddLocation} alt="Not Found" />
      </div>
    </div>
  );
};

export default LandingPage;
