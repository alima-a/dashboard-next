import type { HistoricalData } from '@/src/app/components/Dashboard/StockChart';

export const TICKERS = ['AAPL', 'TSLA', 'MSFT', 'GOOG', 'AMZN'] as const;
export type Ticker = (typeof TICKERS)[number];

function makeSeed(symbol: string) {
  return Array.from(symbol).reduce((a, ch) => a + ch.charCodeAt(0), 0);
}
function seededRandomFactory(seedInit: number) {
  let seed = seedInit % 2147483647;
  if (seed <= 0) seed += 2147483646;
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

export function generateHistorical(
  symbol: string,
  days = 60,
  basePrice?: number,
): HistoricalData[] {
  const baseBySymbol: Record<string, number> = {
    AAPL: 185,
    TSLA: 230,
    MSFT: 405,
    GOOG: 165,
    AMZN: 175,
  };
  const start = basePrice ?? baseBySymbol[symbol] ?? 150;

  const rnd = seededRandomFactory(makeSeed(symbol));
  const today = new Date();
  const out: HistoricalData[] = [];
  let price = start;

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const drift = (rnd() - 0.5) * 0.6;
    const volatility = (rnd() - 0.5) * 2.0;
    const seasonal = Math.sin(i / 6) * 0.8;
    const pct = (drift + volatility + seasonal) / 100;
    price = Math.max(5, price * (1 + pct));
    out.push({ date: d.toISOString().slice(0, 10), close: Number(price.toFixed(2)) });
  }
  return out; // свежие → старые
}

export const mockBySymbol: Record<Ticker, HistoricalData[]> = {
  AAPL: generateHistorical('AAPL', 60),
  TSLA: generateHistorical('TSLA', 60),
  MSFT: generateHistorical('MSFT', 60),
  GOOG: generateHistorical('GOOG', 60),
  AMZN: generateHistorical('AMZN', 60),
};

// mock for table
