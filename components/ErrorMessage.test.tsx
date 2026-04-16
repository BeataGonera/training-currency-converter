import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders nothing when message is null", () => {
    const { container } = render(<ErrorMessage message={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the error message when message is provided", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders with correct styling and icon", () => {
    render(<ErrorMessage message="Error!" />);
    const alert = screen.getByText("Error!").closest("div");
    expect(alert).toHaveClass("bg-red-50");
    expect(alert?.querySelector("svg")).toBeInTheDocument();
  });

  it("renders special characters and long messages", () => {
    const specialMsg = "⚠️ Error: Something failed! Please try again.";
    render(<ErrorMessage message={specialMsg} />);
    expect(screen.getByText(specialMsg)).toBeInTheDocument();
  });
});
