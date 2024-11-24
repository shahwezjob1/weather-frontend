import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "../../components/SearchBox";
import {
  ENTER_STRING_ONLY_ERROR_MSG,
  ENTER_THREEE_LETTERS_ERROR_MSG,
} from "../../utils/constants";

describe("SearchBox Component", () => {
  it("renders without errors", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    // Check if the input field and search icon are rendered
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();

    const searchIcon = screen.getByTestId("seach-icon-btn");
    expect(searchIcon).toBeInTheDocument();
  });

  it("calls handleChangeCity when a valid city is entered and search icon is clicked", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering a valid city name
    fireEvent.change(searchBox, { target: { value: "New York" } });

    // Simulate clicking the search icon
    const searchButton = screen.getByTestId("seach-icon-btn");
    fireEvent.click(searchButton);

    // Assert that handleChangeCity was called with the correct city name
    expect(handleChangeCity).toHaveBeenCalledWith("New York");
  });

  it("displays an error message when less than 3 characters are entered", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering a city name with less than 3 characters
    fireEvent.change(searchBox, { target: { value: "Ny" } });

    // Simulate clicking the search icon
    const searchButton = screen.getByTestId("seach-icon-btn");
    fireEvent.click(searchButton);

    // Check if the error message is displayed
    const errorMessage = screen.getByText(ENTER_THREEE_LETTERS_ERROR_MSG);
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when non-alphabetic characters are entered", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering a city name with non-alphabetic characters
    fireEvent.change(searchBox, { target: { value: "New York 123" } });

    // Simulate clicking the search icon
    const searchButton = screen.getByTestId("seach-icon-btn");
    fireEvent.click(searchButton);

    // Check if the error message is displayed
    const errorMessage = screen.getByText(ENTER_STRING_ONLY_ERROR_MSG);
    expect(errorMessage).toBeInTheDocument();
  });

  it("calls handleChangeCity when 'Enter' key is pressed with a valid city name", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering a valid city name
    fireEvent.change(searchBox, { target: { value: "New York" } });

    // Simulate pressing the 'Enter' key
    fireEvent.keyDown(searchBox, { key: "Enter" });

    // Assert that handleChangeCity was called with the correct city name
    expect(handleChangeCity).toHaveBeenCalledWith("New York");
  });

  it("does not call handleChangeCity if the input is invalid (less than 3 characters)", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering a city name with less than 3 characters
    fireEvent.change(searchBox, { target: { value: "Ny" } });

    // Simulate pressing the 'Enter' key
    fireEvent.keyDown(searchBox, { key: "Enter" });

    // Assert that handleChangeCity was not called
    expect(handleChangeCity).not.toHaveBeenCalled();
  });

  it("clears error message when valid city is entered", () => {
    const handleChangeCity = jest.fn();
    render(<SearchBox handleChangeCity={handleChangeCity} />);

    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering invalid city (less than 3 characters)
    fireEvent.change(searchBox, { target: { value: "Ny" } });
    const searchButton = screen.getByTestId("seach-icon-btn");
    fireEvent.click(searchButton);

    // Error should be shown
    expect(
      screen.getByText(ENTER_THREEE_LETTERS_ERROR_MSG)
    ).toBeInTheDocument();

    // Simulate entering a valid city
    fireEvent.change(searchBox, { target: { value: "New York" } });
    fireEvent.click(searchButton);

    // Error message should be cleared
    expect(screen.queryByText(ENTER_THREEE_LETTERS_ERROR_MSG)).toBeNull();
  });
});
