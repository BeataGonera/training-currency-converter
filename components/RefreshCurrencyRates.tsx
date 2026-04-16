"use client";
import React, { useState } from "react";

interface RefreshCurrencyRatesProps {
  onRefresh: () => Promise<void>;
  loading: boolean;
  error?: string | null;
  success?: boolean;
}

const RefreshCurrencyRates: React.FC<RefreshCurrencyRatesProps> = ({
  onRefresh,
  loading,
  error,
  success,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center min-w-[120px]">
      <button
        type="button"
        className="px-3 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60 flex items-center gap-2"
        onClick={onRefresh}
        disabled={loading}
        aria-busy={loading}
      >
        {loading && (
          <span className="animate-spin mr-1 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
        )}
        Refresh Rates
      </button>
      {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
      {showSuccess && !error && (
        <span className="text-xs text-green-600 mt-1">Rates updated!</span>
      )}
    </div>
  );
};

export default RefreshCurrencyRates;
