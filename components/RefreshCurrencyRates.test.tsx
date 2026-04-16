import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RefreshCurrencyRates from "./RefreshCurrencyRates";

describe("RefreshCurrencyRates", () => {
  it("renders button and calls onRefresh", async () => {
    const onRefresh = jest.fn().mockResolvedValue(undefined);
    render(<RefreshCurrencyRates onRefresh={onRefresh} loading={false} />);
    const button = screen.getByRole("button", { name: /refresh rates/i });
    fireEvent.click(button);
    expect(onRefresh).toHaveBeenCalled();
  });

  it("disables button and shows spinner when loading", () => {
    render(<RefreshCurrencyRates onRefresh={jest.fn()} loading={true} />);
    const button = screen.getByRole("button", { name: /refresh rates/i });
    expect(button).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText(/refresh rates/i)).toBeInTheDocument();
  });

  it("shows error message if error is present", () => {
    render(
      <RefreshCurrencyRates
        onRefresh={jest.fn()}
        loading={false}
        error="Failed!"
      />,
    );
    expect(screen.getByText(/failed!/i)).toBeInTheDocument();
  });

  it("shows success message when success is true", async () => {
    render(
      <RefreshCurrencyRates
        onRefresh={jest.fn()}
        loading={false}
        success={true}
      />,
    );
    expect(screen.getByText(/rates updated!/i)).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.queryByText(/rates updated!/i)).not.toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });
});
