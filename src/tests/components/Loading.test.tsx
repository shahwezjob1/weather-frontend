import { render, screen } from "@testing-library/react";
import Loading from "../../components/Loading";

describe("Loading Component", () => {
  it("renders the loading container", () => {
    render(<Loading />);

    // Check for the outer container
    const container = screen.getByTestId("loading-container");
    expect(container).toBeInTheDocument();
  });

  it("renders the SVG with the correct classes", () => {
    render(<Loading />);

    // Check for the SVG element
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass("loading-svg");

    const groupElement = screen.getByLabelText("Loading dots");
    expect(groupElement).toBeInTheDocument();

    const circles = screen.getAllByTestId("dot");
    expect(circles).toHaveLength(5);
  });
});
