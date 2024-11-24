const Loading = () => {
  return (
    <div
      className="flex justify-center flex-1 items-center bg-gray-100"
      data-testid="loading-container"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-2xl">
        <svg
          role="img"
          className="loading-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g className="g-group" aria-label="Loading dots">
            <circle className="dot" cx="30vw" data-testid="dot" />
            <circle className="dot" cx="40vw" data-testid="dot" />
            <circle className="dot" cx="50vw" data-testid="dot" />
            <circle className="dot" cx="60vw" data-testid="dot" />
            <circle className="dot" cx="70vw" data-testid="dot" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
