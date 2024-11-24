import { render, screen } from "@testing-library/react";
import App from "../App";
import { useWeatherHook } from "../hooks/useWeatherHook";

// Mock the useWeatherHook hook
jest.mock("../hooks/useWeatherHook");

describe("App Component", () => {
  it("renders NavBar and Home when weather data is available", async () => {
    // Mock the return value of useWeatherHook
    (useWeatherHook as jest.Mock).mockReturnValue({
      cityName: "New York",
      loading: false,
      allWeatherData: {
        city: { name: "New York" },
        current: {
          temp: 25,
          wind: 10, // Add wind value here
          feelsLike: 23,
          humidity: 60,
          advisory: "Sunny weather",
        },
        forecast: [],
      },
      handleChangeCity: jest.fn(),
    });

    render(<App />);

    // Check if the NavBar is rendered
    expect(screen.getByTestId("NavBar")).toBeInTheDocument();

    // Check if Home page is rendered and has correct city name and temp
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("renders LandingPage when weather data is not available", async () => {
    // Mock the return value of useWeatherHook
    (useWeatherHook as jest.Mock).mockReturnValue({
      cityName: "",
      loading: false,
      allWeatherData: null,
      handleChangeCity: jest.fn(),
    });

    render(<App />);

    // Check if the LandingPage is rendered
    expect(screen.getByTestId("landing-instruction")).toBeInTheDocument();
  });
});
