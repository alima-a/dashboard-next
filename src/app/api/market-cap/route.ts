import { NextResponse } from 'next/server';
import { getMarketCaps } from '@/src/app/lib/fmp';
import { Ticker } from '@/src/app/types/fmp';

export const revalidate = 3600; // SSR cache hints

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbolsParam = searchParams.get('symbols'); // "AAPL,TSLA,MSFT,GOOG,AMZN"
  const list = (symbolsParam ?? '').split(',').filter(Boolean) as Ticker[];

  // safety fallback
  const symbols = list.length > 0 ? list : (['AAPL', 'TSLA', 'MSFT', 'GOOG', 'AMZN'] as Ticker[]);

  const data = await getMarketCaps(symbols, revalidate);
  return NextResponse.json(data, { status: 200 });
}
