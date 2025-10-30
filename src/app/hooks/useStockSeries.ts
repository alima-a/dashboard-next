import { useMemo } from 'react';
import { mockBySymbol, Ticker } from '@/src/app/mockData';
import type { HistoricalData } from '@/src/app/components/Dashboard/StockChart';

// React Query + fetch к FMP:
// const { data, isLoading, error } = useQuery({ queryKey: ['prices', symbol, range], ... })

export function useStockSeries(symbol: Ticker, days = 60): { data: HistoricalData[] } {
  // Срезаем диапозон тут — презентационный компонент остаётся простым
  const data = useMemo(() => mockBySymbol[symbol].slice(0, days), [symbol, days]);
  return { data };
}
