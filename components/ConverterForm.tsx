import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import SwapButton from "./SwapButton";
import ConversionResult from "./ConversionResult";
import { ExchangeRates } from "@/types";
import RefreshCurrencyRates from "./RefreshCurrencyRates";

interface ConverterFormProps {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  result: number | null;
  validationError: string | null;
  exchangeRates: ExchangeRates | null;
  onAmountChange: (value: string) => void;
  onFromCurrencyChange: (value: string) => void;
  onToCurrencyChange: (value: string) => void;
  onSwap: () => void;
  onRefreshRates?: () => Promise<void>;
  refreshLoading?: boolean;
  refreshError?: string | null;
  refreshSuccess?: boolean;
}

export default function ConverterForm({
  amount,
  fromCurrency,
  toCurrency,
  result,
  validationError,
  exchangeRates,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwap,
  onRefreshRates,
  refreshLoading,
  refreshError,
  refreshSuccess,
}: ConverterFormProps) {
  const currentRate =
    exchangeRates && fromCurrency && toCurrency
      ? exchangeRates.rates[toCurrency] / exchangeRates.rates[fromCurrency]
      : null;

  return (
    <div className="space-y-4">
      {/* Single Row: Amount and Currency Selectors */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <AmountInput
            value={amount}
            onChange={onAmountChange}
            error={validationError}
          />

          <CurrencySelect
            value={fromCurrency}
            onChange={onFromCurrencyChange}
            exclude={toCurrency}
          />

          <SwapButton onClick={onSwap} />

          <CurrencySelect
            value={toCurrency}
            onChange={onToCurrencyChange}
            exclude={fromCurrency}
          />

          {/* RefreshCurrencyRates button next to selectors */}
          {onRefreshRates && (
            <RefreshCurrencyRates
              onRefresh={onRefreshRates}
              loading={!!refreshLoading}
              error={refreshError}
              success={refreshSuccess}
            />
          )}
        </div>

        {/* Error message below the row */}
        {validationError && (
          <p className="text-sm text-red-600 px-1">{validationError}</p>
        )}
      </div>

      {/* Result Display */}
      {!validationError && (
        <ConversionResult
          result={result}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rate={currentRate}
        />
      )}
    </div>
  );
}
