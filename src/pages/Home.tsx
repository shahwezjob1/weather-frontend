import React from "react";
import { FaLocationDot, FaTemperatureLow, FaWind } from "react-icons/fa6";
import { WeatherResponse } from "../utils/Types";
import { formatCurrentDateTime } from "../utils/helper";
import { WiHumidity } from "react-icons/wi";
import Accordion from "../components/Accordion";
import Loading from "../components/Loading";
interface HomePageProps {
  allWeatherData?: WeatherResponse;
  loading: boolean;
}
const Home: React.FC<HomePageProps> = ({ allWeatherData, loading }) => {
  const { city, current, forecast } = allWeatherData || {};
  if (loading) return <Loading />;
  return (
    <div className="flex justify-center flex-1 items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg sm:max-w-2xl">
        <div className="flex justify-between pb-2 border-b-2">
          <div>
            <h2 className="text-2xl font-semibold text-left flex">
              <FaLocationDot className="mr-2" />
              {city?.name}
            </h2>
            <span className="text-xs">{formatCurrentDateTime()}</span>
          </div>
          <div className="flex">
            <h1 className="text-3xl self-center">
              {parseInt(current?.temp?.toString() ?? "0")}&deg;
            </h1>
            <span className="text-sm self-center pt-3">C</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-2 mb-3">
          <div className="col-span-8 italic text-lg">
            &quot;{current?.advisory}&quot;
          </div>
          <div className="col-span-4">
            <span className="text-xs flex gap-1 justify-end">
              <FaTemperatureLow />
              Feels like: {parseInt(current?.feelsLike?.toString() ?? "0")}
              &deg;
            </span>
            <span className="text-xs flex gap-1 justify-end">
              <WiHumidity size={15} className="" /> Humidity:{" "}
              {current?.humidity}%
            </span>
            <span className="text-xs flex gap-1 justify-end">
              <FaWind /> Wind: {current?.wind.toFixed(1)} km/h
            </span>
          </div>
        </div>
        <Accordion forecast={forecast ?? []} />
      </div>
    </div>
  );
};

export default Home;
