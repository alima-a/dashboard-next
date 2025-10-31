export type Ticker = 'AAPL' | 'TSLA' | 'AMZN';

export interface MarketCapPoint {
  date: string; // ISO
  marketCap: number; // USD
  symbol: string;
}

export interface DelistedCompany {
  symbol: string;
  companyName: string;
  exchange: string;
  ipoDate: string; // "YYYY-MM-DD"
  delistedDate: string; // "YYYY-MM-DD"
}
