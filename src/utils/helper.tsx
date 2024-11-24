import { toast } from "react-toastify";
import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaSnowflake,
  FaCloudShowersHeavy,
  FaCloudMeatball,
} from "react-icons/fa";
import { FaCloudSunRain, FaCloudBolt } from "react-icons/fa6";
import { RiMistLine } from "react-icons/ri";
import { CacheResponse, WeatherIconProps, WeatherResponse } from "./Types";

export const formatCurrentDateTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const dateFormatter = new Intl.DateTimeFormat("en-IN", options);
  const formattedDate = dateFormatter.format(now);
  const date =
    formattedDate.split(", ")[0] + ", " + formattedDate.split(", ")[1];
  const finalFormattedString = `${date}`;
  return finalFormattedString;
};
export const notifyError = (errorMsg: string): void => {
  const knownErrorMsg = ["city not found"];
  const messageToShow = knownErrorMsg.includes(errorMsg.toLowerCase())
    ? errorMsg
    : "Something Went Wrong";
  const formattedErrorMsg = messageToShow.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
  toast.error(formattedErrorMsg);
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  dataTestid,
  className,
}) => {
  const iconMapping: Record<number, JSX.Element> = {
    1: (
      <FaSun
        aria-label="Clear sky"
        className={className}
        data-testid={dataTestid}
      />
    ),
    2: (
      <FaCloudSun
        aria-label="Partly cloudy"
        className={className}
        data-testid={dataTestid}
      />
    ),
    3: (
      <FaCloud
        aria-label="Cloudy"
        className={className}
        data-testid={dataTestid}
      />
    ),
    13: (
      <FaSnowflake
        aria-label="Snow"
        className={className}
        data-testid={dataTestid}
      />
    ),
    9: (
      <FaCloudShowersHeavy
        aria-label="Heavy rain"
        className={className}
        data-testid={dataTestid}
      />
    ),
    4: (
      <FaCloudMeatball
        aria-label="Partly cloudy with a chance of meatballs"
        className={className}
        data-testid={dataTestid}
      />
    ),
    10: (
      <FaCloudSunRain
        aria-label="Cloudy with rain"
        className={className}
        data-testid={dataTestid}
      />
    ),
    11: (
      <FaCloudBolt
        aria-label="Thunderstorm"
        className={className}
        data-testid={dataTestid}
      />
    ),
    50: (
      <RiMistLine
        aria-label="Mist"
        className={className}
        data-testid={dataTestid}
      />
    ),
  };

  return iconMapping[iconCode] || null;
};
export const updateLocalStorageWithWeatherData = (
  cityName: String,
  newData: WeatherResponse
) => {
  const weatherData: CacheResponse[] = JSON.parse(
    localStorage.getItem("weatherData") || "[]"
  );
  const existingCityIndex = weatherData.findIndex(
    (ele: CacheResponse) =>
      ele.city === cityName || newData.city.name === ele.data.city.name
  );

  if (existingCityIndex !== -1) {
    if (
      weatherData[existingCityIndex].city.toUpperCase() !==
      cityName.toUpperCase()
    )
      weatherData[existingCityIndex].city = cityName.toUpperCase();
    weatherData[existingCityIndex].data = newData;
  } else {
    weatherData.push({ city: cityName.toUpperCase(), data: newData });
  }

  if (weatherData.length > 10) {
    weatherData.shift();
  }
  localStorage.setItem("weatherData", JSON.stringify(weatherData));
};
