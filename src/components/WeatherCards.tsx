import React from "react";

import { StepUp } from "../utils/Types";
import { WeatherIcon } from "../utils/helper";

const WeatherCards: React.FC<StepUp> = ({ time, icon, temp, humidity }) => {
  const [date, period] = time.split(" ");

  return (
    <div className="flex flex-col text-xs bg-blue-200 text-gray-600 py-2 px-4 rounded-md items-center gap-1">
      <span>
        {date}&nbsp;{period}
      </span>
      <WeatherIcon iconCode={parseInt(icon, 10)} />
      <span>{`${parseInt(temp.toString())}°`}</span>
      <span>{`${humidity}%`}</span>
    </div>
  );
};

export default WeatherCards;
