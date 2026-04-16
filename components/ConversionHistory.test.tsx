import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConversionHistory from "./ConversionHistory";
import { ConversionResult } from "@/types";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("ConversionHistory", () => {
  const mockOnToggle = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnLoadConversion = jest.fn();
  const baseHistory: ConversionResult[] = [
    {
      from: "USD",
      to: "EUR",
      amount: 100,
      result: 92,
      rate: 0.92,
      timestamp: 1713200000000,
    },
    {
      from: "EUR",
      to: "GBP",
      amount: 50,
      result: 43,
      rate: 0.86,
      timestamp: 1713201000000,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders history and handles toggle", async () => {
    render(
      <ConversionHistory
        history={baseHistory}
        showHistory={true}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    expect(screen.getByText("Conversion History")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Clear History/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Hide \(2\)/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("100.00 USD → 92.00 EUR")).toBeInTheDocument();
    expect(screen.getByText("50.00 EUR → 43.00 GBP")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Hide \(2\)/i }));
    expect(mockOnToggle).toHaveBeenCalled();
  });

  it("calls onClear when clear button is clicked", async () => {
    render(
      <ConversionHistory
        history={baseHistory}
        showHistory={true}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Clear History/i }),
    );
    expect(mockOnClear).toHaveBeenCalled();
  });

  it("calls onLoadConversion when a history item is clicked", async () => {
    render(
      <ConversionHistory
        history={baseHistory}
        showHistory={true}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    await userEvent.click(screen.getByTestId("history-item-0"));
    expect(mockOnLoadConversion).toHaveBeenCalledWith(baseHistory[0]);
  });

  it("shows empty state when history is empty", () => {
    render(
      <ConversionHistory
        history={[]}
        showHistory={true}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    expect(screen.getByText("No conversion history yet")).toBeInTheDocument();
    expect(screen.queryByText("Clear History")).not.toBeInTheDocument();
  });

  it("shows Show button when showHistory is false", () => {
    render(
      <ConversionHistory
        history={baseHistory}
        showHistory={false}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    expect(
      screen.getByRole("button", { name: /Show \(2\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("100.00 USD → 92.00 EUR"),
    ).not.toBeInTheDocument();
  });

  it("is accessible (axe)", async () => {
    const { container } = render(
      <ConversionHistory
        history={baseHistory}
        showHistory={true}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles edge case: rapid clear and toggle", async () => {
    render(
      <ConversionHistory
        history={baseHistory}
        showHistory={true}
        onToggle={mockOnToggle}
        onClear={mockOnClear}
        onLoadConversion={mockOnLoadConversion}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Clear History/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /Hide \(2\)/i }));
    expect(mockOnClear).toHaveBeenCalled();
    expect(mockOnToggle).toHaveBeenCalled();
  });
});
