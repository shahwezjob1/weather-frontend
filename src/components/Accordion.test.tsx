import React from "react";
import { render, screen } from "@testing-library/react";
import Accordion from "./Accordion";
import { ForecastDetails } from "../utils/Types";

const mockForecast: ForecastDetails[] = [
  {
    date: "2024-11-20",
    steps: [
      { time: "12 PM", icon: "02n", temp: 26.94, humidity: 50 },
      { time: "3 PM", icon: "01n", temp: 24.87, humidity: 53 },
    ],
  },
  {
    date: "2024-11-21",
    steps: [
      { time: "12 PM", icon: "01n", temp: 25.1, humidity: 48 },
      { time: "3 PM", icon: "01n", temp: 23.4, humidity: 52 },
    ],
  },
];

describe("Accordion Component", () => {
  it("renders the correct number of AccordionItems", () => {
    render(<Accordion forecast={mockForecast} />);
    expect(screen.getAllByRole("button")).toHaveLength(2); // 2 AccordionItems
  });

  it("handles an empty forecast array gracefully", () => {
    render(<Accordion forecast={[]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
