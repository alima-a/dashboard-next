import { serverFetch } from './fetch';
import { DelistedCompany, MarketCapPoint } from '@/src/app/types/fmp';
import { Ticker } from '@/src/app/types/fmp';

const BASE = process.env.FMP_BASE!;
const KEY = process.env.FMP_API_KEY!;

/**
 * Returns the market cap history for an array of tickers.
 * Normalizes into an array with a symbol field for each point.
 */
export async function getMarketCaps(
  symbols: Ticker[],
  revalidateSeconds = 3600,
): Promise<Record<Ticker, MarketCapPoint[]>> {
  const entries = await Promise.all(
    symbols.map(async (symbol) => {
      const url = `${BASE}/historical-market-capitalization?symbol=${symbol}&apikey=${KEY}`;
      const raw = await serverFetch<any[]>(url, revalidateSeconds);
      const data: MarketCapPoint[] = (raw ?? []).map((d) => ({
        date: d.date,
        marketCap: Number(d.marketCap),
        symbol,
      }));
      return [symbol, data] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<Ticker, MarketCapPoint[]>;
}

/**
 * Returns a list of Delisted Companies.
 */
export async function getDelisted(page = 0, limit = 100, revalidateSeconds = 1800) {
  const url = `${BASE}/delisted-companies?page=${page}&limit=${limit}&apikey=${KEY}`;
  try {
    const data = await serverFetch<DelistedCompany[]>(url, revalidateSeconds);
    return data ?? [];
  } catch (e) {
    return [];
  }
}
