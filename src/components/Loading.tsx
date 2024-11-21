import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center flex-1 items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-2xl">
        <svg
          className="loading-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g className="g-group">
            <circle className="dot" cx="30vw" />
            <circle className="dot" cx="40vw" />
            <circle className="dot" cx="50vw" />
            <circle className="dot" cx="60vw" />
            <circle className="dot" cx="70vw" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
