import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketCapPoint, Ticker } from '@/src/app/types/fmp';

export interface MarketCapsState {
  itemsBySymbol: Record<string, MarketCapPoint[]>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
const initialState: MarketCapsState = { itemsBySymbol: {}, status: 'idle' };

export const fetchMarketCaps = createAsyncThunk('marketCaps/fetch', async (symbols: Ticker[]) => {
  const qs = encodeURIComponent(symbols.join(','));
  const res = await fetch(`/api/market-cap?symbols=${qs}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load market caps');
  return (await res.json()) as Record<Ticker, MarketCapPoint[]>;
});

const slice = createSlice({
  name: 'marketCaps',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<Record<string, MarketCapPoint[]>>) {
      state.itemsBySymbol = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketCaps.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarketCaps.fulfilled, (state, { payload }) => {
        state.itemsBySymbol = payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMarketCaps.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export const { hydrate } = slice.actions;
export default slice.reducer;
