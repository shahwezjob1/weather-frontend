import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";
import { WeatherResponse } from "../../utils/Types";

// Mock the required icons
jest.mock("react-icons/fa6", () => ({
  FaLocationDot: () => <div data-testid="fa-location-dot" />,
  FaTemperatureLow: () => <div data-testid="fa-temperature-low" />,
  FaWind: () => <div data-testid="fa-wind" />,
}));

jest.mock("react-icons/wi", () => ({
  WiHumidity: () => <div data-testid="wi-humidity" />,
}));

// Mock formatCurrentDateTime function
jest.mock("../../utils/helper", () => ({
  formatCurrentDateTime: () => "Mocked Date",
}));

describe("Home Component", () => {
  const mockWeatherData: WeatherResponse = {
    city: {
      name: "New York",
      sunrise: 0,
      sunset: 0,
    },
    current: {
      temp: 25,
      feelsLike: 22,
      humidity: 60,
      wind: 10,
      advisory: "Clear sky",
      date: "",
      highTemp: 0,
      lowTemp: 0,
    },
    forecast: [],
  };

  it("displays loading indicator when loading is true", () => {
    render(<Home loading={true} />);

    // Check if the loading component is rendered
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });

  it("displays weather data when loading is false and data is provided", () => {
    render(<Home loading={false} allWeatherData={mockWeatherData} />);

    // Check if the location icon is rendered
    expect(screen.getByTestId("fa-location-dot")).toBeInTheDocument();

    // Check if the city name is rendered
    expect(screen.getByText("New York")).toBeInTheDocument();

    // Check if the current temperature is displayed
    expect(screen.getByText("25°")).toBeInTheDocument();

    // Check if the "Feels like" value is displayed
    expect(screen.getByText(/Feels like: 22°/)).toBeInTheDocument();

    // Check if the humidity value is displayed
    expect(screen.getByText(/Humidity: 60%/)).toBeInTheDocument();

    // Check if the wind speed is displayed
    expect(screen.getByText(/Wind: 10.0 km\/h/)).toBeInTheDocument();

    // Check if the advisory message is rendered
    expect(screen.getByText('"Clear sky"')).toBeInTheDocument();

    // Check if the date is mocked correctly
    expect(screen.getByText("Mocked Date")).toBeInTheDocument();
  });
});
