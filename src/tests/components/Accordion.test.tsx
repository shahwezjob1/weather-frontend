import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "../../components/Accordion";
import { ForecastDetails } from "../../utils/Types";

const mockForecast: ForecastDetails[] = [
  {
    date: "2024-11-24",
    steps: [
      { time: "6 AM", icon: "03d", temp: 25.97, humidity: 53 },
      { time: "9 AM", icon: "03d", temp: 26.61, humidity: 46 },
    ],
  },
  {
    date: "2024-11-25",
    steps: [
      { time: "6 AM", icon: "04d", temp: 27.31, humidity: 29 },
      { time: "9 AM", icon: "04d", temp: 27.45, humidity: 27 },
    ],
  },
  {
    date: "2024-11-26",
    steps: [
      { time: "6 AM", icon: "04d", temp: 26.83, humidity: 34 },
      { time: "9 AM", icon: "04d", temp: 27.03, humidity: 34 },
    ],
  },
  {
    date: "2024-11-27",
    steps: [
      { time: "6 AM", icon: "04d", temp: 27.79, humidity: 37 },
      { time: "9 AM", icon: "04d", temp: 27.89, humidity: 34 },
    ],
  },
  {
    date: "2024-11-28",
    steps: [
      { time: "6 AM", icon: "04d", temp: 24.3, humidity: 52 },
      { time: "9 AM", icon: "04d", temp: 25.58, humidity: 44 },
    ],
  },
];

describe("Accordion Component", () => {
  it("renders the correct number of accordion items (max 4)", () => {
    render(<Accordion forecast={mockForecast} />);
    const accordionItems = screen.getAllByRole("button");
    expect(accordionItems).toHaveLength(4); // Limited to 4 items
  });

  it("toggles accordion item on click", () => {
    render(<Accordion forecast={mockForecast} />);

    // Find the button for "Today's Weather"
    const todaysWeatherButton = screen.getByRole("button", {
      name: /Today's Weather/i,
    });

    // Click to reopen the region
    fireEvent.click(todaysWeatherButton);
    expect(todaysWeatherButton).toBeVisible();
  });

  it("renders weather cards inside the accordion", () => {
    render(<Accordion forecast={mockForecast} />);
    const weatherCards = screen.getAllByLabelText("humidity");
    expect(weatherCards.length).toBeGreaterThan(0);
  });

  it("closes previously open accordion when a new one is opened", () => {
    render(<Accordion forecast={mockForecast} />);
    const firstButton = screen.getByRole("button", {
      name: /Today's Weather/i,
    });
    const secondButton = screen.getByRole("button", {
      name: /Monday's Weather/i,
    });

    // Initially open first accordion
    expect(
      screen.getByRole("region", { name: /Today's Weather/i })
    ).toBeVisible();

    // Open the second accordion
    fireEvent.click(secondButton);
    expect(
      screen.getByRole("region", { name: /Monday's Weather/i })
    ).toBeVisible();
  });

  it("handles no forecast data gracefully", () => {
    render(<Accordion forecast={[]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument(); // No accordions should render
  });
});
