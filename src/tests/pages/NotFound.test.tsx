import { render, screen } from "@testing-library/react";
import NotFound from "../../pages/NotFound";
import NotFoundSvg from "../../assets/not_found.svg";

describe("NotFound Component", () => {
  it("displays the correct image", () => {
    render(<NotFound />);

    // Check if the image with the alt text 'Not Found' is rendered
    const image = screen.getByAltText("Not Found");
    expect(image).toBeInTheDocument();

    // Check if the src of the image is correct
    expect(image).toHaveAttribute("src", NotFoundSvg);
  });
});
