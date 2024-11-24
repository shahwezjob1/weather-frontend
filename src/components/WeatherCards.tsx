import React from "react";

import { StepUp } from "../utils/Types";
import { WeatherIcon } from "../utils/helper";

const WeatherCards: React.FC<StepUp> = ({ time, icon, temp, humidity }) => {
  const [date, period] = time.split(" ");

  return (
    <div className="flex flex-col text-xs bg-blue-200 text-gray-600 py-2 px-4 rounded-md items-center gap-1">
      <span data-testid="weather-card-time">
        {date}&nbsp;{period}
      </span>
      <WeatherIcon
        dataTestid="weather-card-icon"
        iconCode={parseInt(icon, 10)}
        className="text-sm sm:text-2xl"
      />
      <span data-testid="weather-card-temp">{`${parseInt(
        temp.toString()
      )}°`}</span>
      <span aria-label="humidity">{`${humidity}%`}</span>
    </div>
  );
};

export default WeatherCards;
