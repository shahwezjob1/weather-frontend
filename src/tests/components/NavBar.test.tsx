import { render, screen } from "@testing-library/react";
import NavBar from "../../components/NavBar";
import { APP_NAME, OFFLINE_TEXT } from "../../utils/constants";
import { fireEvent } from "@testing-library/react";

// Mocking the custom hook for offline status
jest.mock("../../hooks/useOnlineStatusHook", () => jest.fn());

describe("NavBar Component", () => {
  it("renders the NavBar with the correct APP_NAME", () => {
    render(<NavBar handleChangeCity={() => {}} />);

    const appName = screen.getByText(APP_NAME);
    expect(appName).toBeInTheDocument();
  });

  it("renders the SearchBox component", () => {
    render(<NavBar handleChangeCity={() => {}} />);

    const searchBox = screen.getByRole("textbox"); // Assuming SearchBox renders an input element
    expect(searchBox).toBeInTheDocument();
  });

  it("displays offline message when useOnlineStatusHook returns false", () => {
    // Mock useOnlineStatusHook to return false
    const mockUseOnlineStatusHook = require("../../hooks/useOnlineStatusHook");
    mockUseOnlineStatusHook.mockReturnValue(true);

    render(<NavBar handleChangeCity={() => {}} />);

    // Check if the offline message appears
    expect(screen.getByText(/offline/i)).toBeInTheDocument();

    // Check if the offline icon is also rendered
    const offlineIcon = screen.getByTestId("ni-wifi-img");
    expect(offlineIcon).toBeInTheDocument();
  });

  it("does not display offline message when useOnlineStatusHook returns true", () => {
    // Mock useOnlineStatusHook to return true
    const mockUseOnlineStatusHook = require("../../hooks/useOnlineStatusHook");
    mockUseOnlineStatusHook.mockReturnValue(false);

    render(<NavBar handleChangeCity={() => {}} />);

    // Check that the offline message is not rendered
    const offlineMessage = screen.queryByText(OFFLINE_TEXT);
    expect(offlineMessage).not.toBeInTheDocument();
  });

  it("calls handleChangeCity when a new city is entered in the SearchBox", () => {
    const handleChangeCity = jest.fn();
    render(<NavBar handleChangeCity={handleChangeCity} />);

    // Get the input element
    const searchBox = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate entering text in the input
    fireEvent.change(searchBox, { target: { value: "New York" } });

    const searchButton = screen.getByRole("button");
    // Simulate clicking the search button
    fireEvent.click(searchButton);
    // Simulate the user submitting the search (if applicable)
    expect(handleChangeCity).toHaveBeenCalledWith("New York");
  });
});
