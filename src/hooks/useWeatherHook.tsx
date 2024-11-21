import { useState, useEffect } from "react";
import { notifyError } from "../utils/helper";
import { WeatherResponse } from "../utils/Types";
import { DEFAULT_ERROR_MSG } from "../utils/constants";

export const useWeatherHook = () => {
  const [cityName, setCityName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [allWeatherData, setAllWeatherData] = useState<WeatherResponse | null>(
    null
  );
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (cityName) {
      setLoading(true);
      fetch(`${apiUrl}?city=${cityName}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data?.message) {
            setAllWeatherData(data);
          }
          if (data?.message) {
            notifyError(data?.message);
          }
        })
        .catch((error) => {
          notifyError(DEFAULT_ERROR_MSG);
          console.error("Error: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cityName, apiUrl]);

  const handleChangeCity = (name: string) => {
    setCityName(name);
  };

  return {
    cityName,
    loading,
    allWeatherData,
    handleChangeCity,
  };
};
