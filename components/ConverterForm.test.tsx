// Removed duplicate misplaced test block
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConverterForm from "./ConverterForm";
import { ExchangeRates } from "@/types";

const mockExchangeRates: ExchangeRates = {
  base: "USD",
  rates: {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
  },
  timestamp: Date.now(),
};

describe("ConverterForm", () => {
  const defaultProps = {
    amount: "100",
    fromCurrency: "USD",
    toCurrency: "EUR",
    result: 85,
    validationError: null,
    exchangeRates: mockExchangeRates,
    onAmountChange: jest.fn(),
    onFromCurrencyChange: jest.fn(),
    onToCurrencyChange: jest.fn(),
    onSwap: jest.fn(),
    // Provide no-op for optional refresh props to avoid test errors
    onRefreshRates: undefined,
    refreshLoading: false,
    refreshError: null,
    refreshSuccess: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not allow selecting the same currency in both dropdowns (except for the selected value)", async () => {
    const user = userEvent.setup();
    render(
      <ConverterForm {...defaultProps} fromCurrency="USD" toCurrency="EUR" />,
    );
    const selects = screen.getAllByRole("combobox");
    // In the 'to' dropdown, USD should only be present if it is the selected value
    await user.click(selects[1]);
    const toOptions = screen.getAllByRole("option");
    toOptions.forEach((option) => {
      if (option.value !== "USD") {
        expect(option.textContent).not.toMatch(/USD -/);
      }
    });
    // In the 'from' dropdown, EUR should only be present if it is the selected value
    await user.click(selects[0]);
    const fromOptions = screen.getAllByRole("option");
    fromOptions.forEach((option) => {
      if (option.value !== "EUR") {
        expect(option.textContent).not.toMatch(/EUR -/);
      }
    });
  });

  it("should call onAmountChange when amount input changes", async () => {
    const user = userEvent.setup();

    render(<ConverterForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Enter amount");
    await user.clear(input);
    await user.type(input, "200");

    expect(defaultProps.onAmountChange).toHaveBeenCalled();
  });

  it("should call onFromCurrencyChange when from currency changes", async () => {
    const user = userEvent.setup();

    render(<ConverterForm {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "GBP");

    expect(defaultProps.onFromCurrencyChange).toHaveBeenCalledWith("GBP");
  });

  it("should call onToCurrencyChange when to currency changes", async () => {
    const user = userEvent.setup();

    render(<ConverterForm {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[1], "JPY");

    expect(defaultProps.onToCurrencyChange).toHaveBeenCalledWith("JPY");
  });

  it("should call onSwap when swap button is clicked", async () => {
    const user = userEvent.setup();

    render(<ConverterForm {...defaultProps} />);

    const swapButton = screen.getByRole("button", { name: /swap currencies/i });
    await user.click(swapButton);

    expect(defaultProps.onSwap).toHaveBeenCalledTimes(1);
  });

  it("should calculate and display exchange rate correctly", () => {
    render(<ConverterForm {...defaultProps} />);

    // Rate should be EUR/USD = 0.85/1 = 0.85
    expect(screen.getByText(/1 USD = 0.8500 EUR/)).toBeInTheDocument();
  });

  it("should handle cross-currency rate calculation", () => {
    render(
      <ConverterForm
        {...defaultProps}
        fromCurrency="GBP"
        toCurrency="JPY"
        result={150.68}
      />,
    );

    // Rate should be JPY/GBP = 110/0.73 ≈ 150.6849
    expect(screen.getByText(/1 GBP = 150.6849 JPY/)).toBeInTheDocument();
  });

  it("should display validation error below the input row", () => {
    const errorMessage = "Amount must be greater than zero";

    render(<ConverterForm {...defaultProps} validationError={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    // Error should be displayed as a separate element below the row
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toHaveClass("text-red-600");
  });

  it("should render without exchange rates", () => {
    render(<ConverterForm {...defaultProps} exchangeRates={null} />);

    expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    expect(screen.queryByText(/1 USD =/)).not.toBeInTheDocument();
  });

  it("should handle result of null gracefully", () => {
    render(<ConverterForm {...defaultProps} result={null} />);

    expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    expect(screen.queryByText("Converted Amount")).not.toBeInTheDocument();
  });
});
