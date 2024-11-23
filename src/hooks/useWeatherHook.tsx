import { useState, useEffect } from "react";
import {
  notifyError,
  updateLocalStorageWithWeatherData,
} from "../utils/helper";
import { CacheResponse, WeatherResponse } from "../utils/Types";
import {
  CACHE_KEY,
  DEFAULT_ERROR_MSG,
  OFFLINE_ERROR_MSG,
} from "../utils/constants";

export const useWeatherHook = () => {
  const [cityName, setCityName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [allWeatherData, setAllWeatherData] = useState<WeatherResponse | null>(
    null
  );
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (cityName) {
      if (navigator.onLine) {
        setLoading(true);
        fetch(`${apiUrl}/api/weather?city=${cityName}`)
          .then((response) => response.json())
          .then((data) => {
            if (!data?.message) {
              setAllWeatherData(data);
              updateLocalStorageWithWeatherData(cityName, data);
            }
            if (data?.message) {
              notifyError(data?.message);
            }
          })
          .catch((error) => {
            notifyError(DEFAULT_ERROR_MSG);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        let cachedData = localStorage.getItem(CACHE_KEY);
        const data: CacheResponse[] =
          (cachedData && JSON.parse(cachedData)) || {};
        const existingCityIndex = data.findIndex(
          (ele: CacheResponse) =>
            ele.city.toUpperCase() === cityName.toUpperCase() ||
            ele.data.city.name.toUpperCase() === cityName.toUpperCase()
        );
        if (existingCityIndex !== -1) {
          setAllWeatherData(data[existingCityIndex].data);
        } else {
          notifyError(OFFLINE_ERROR_MSG);
        }
      }
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
