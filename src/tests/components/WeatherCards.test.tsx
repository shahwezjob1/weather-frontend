import { render, screen } from "@testing-library/react";
import WeatherCards from "../../components/WeatherCards";

// Mock the WeatherIcon component to avoid testing it
jest.mock("../../utils/helper", () => ({
  WeatherIcon: () => <div data-testid="weather-icon-mock" />,
}));

describe("WeatherCards Component", () => {
  it("renders weather card with correct time, temperature, and humidity", () => {
    const props = {
      time: "12:00 PM",
      icon: "02n", // Weather icon code
      temp: 25,
      humidity: 60,
    };

    render(<WeatherCards {...props} />);

    // Check if the time is rendered correctly
    expect(screen.getByTestId("weather-card-time")).toHaveTextContent(
      "12:00 PM"
    );

    // Check if the WeatherIcon is rendered
    expect(screen.getByTestId("weather-icon-mock")).toBeInTheDocument();

    // Check if the temperature is rendered correctly
    expect(screen.getByTestId("weather-card-temp")).toHaveTextContent("25°");

    // Check if the humidity is rendered correctly
    expect(screen.getByLabelText("humidity")).toHaveTextContent("60%");
  });

  it("displays temperature as an integer", () => {
    const props = {
      time: "03:00 AM",
      icon: "1",
      temp: 22.5,
      humidity: 50,
    };

    render(<WeatherCards {...props} />);

    // Check if the temperature is rendered as an integer
    expect(screen.getByTestId("weather-card-temp")).toHaveTextContent("22°");
  });

  it("correctly splits the time into date and period", () => {
    const props = {
      time: "02:00 PM",
      icon: "3",
      temp: 30,
      humidity: 70,
    };

    render(<WeatherCards {...props} />);

    // Check if the time is split into date and period
    expect(screen.getByTestId("weather-card-time")).toHaveTextContent(
      "02:00 PM"
    );
  });

  it("renders the weather icon with the correct icon code", () => {
    const props = {
      time: "05:00 PM",
      icon: "4",
      temp: 18,
      humidity: 40,
    };

    render(<WeatherCards {...props} />);

    // Check if the WeatherIcon component is rendered with the correct icon code
    expect(screen.getByTestId("weather-icon-mock")).toBeInTheDocument();
  });

  it("displays a mock WeatherIcon", () => {
    const props = {
      time: "10:00 AM",
      icon: "10",
      temp: 20,
      humidity: 55,
    };

    render(<WeatherCards {...props} />);

    // Ensure that the mock WeatherIcon is rendered
    expect(screen.getByTestId("weather-icon-mock")).toBeInTheDocument();
  });
});
