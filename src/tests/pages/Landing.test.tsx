import { render, screen } from "@testing-library/react";
import LandingPage from "../../pages/LandingPage";
import AddLocation from "../../assets/add_location.svg";

describe("LandingPage Component", () => {
  it("displays the correct instruction text", () => {
    render(<LandingPage />);

    // Check if the instruction text is rendered
    expect(screen.getByTestId("landing-instruction")).toBeInTheDocument();

    // Check if the highlighted "Search" word is bold
    expect(screen.getByText("Search").classList.contains("font-semibold")).toBe(
      true
    );
  });

  it("displays the correct image", () => {
    render(<LandingPage />);

    // Check if the image with the alt text 'Not Found' is rendered
    const image = screen.getByAltText("Not Found");
    expect(image).toBeInTheDocument();

    // Check if the src of the image is correct
    expect(image).toHaveAttribute("src", AddLocation);
  });
});
