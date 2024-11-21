export interface City {
  name: string;
  sunrise: number;
  sunset: number;
}

export interface Current {
  date: string;
  temp: number;
  highTemp: number;
  lowTemp: number;
  advisory: string;
  feelsLike: number;
  wind: number;
  humidity: number;
}

export interface StepUp {
  time: string;
  icon: string;
  temp: number;
  humidity: number;
}

export interface ForecastDetails {
  date: string;
  steps: StepUp[];
}

export interface WeatherResponse {
  city: City;
  current: Current;
  forecast: ForecastDetails[];
}
export type WeatherIconProps = {
  iconCode: number;
};
