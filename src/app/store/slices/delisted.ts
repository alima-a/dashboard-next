import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { DelistedCompany } from '@/src/app/types/fmp';

interface DelistedState {
  items: DelistedCompany[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
const initialState: DelistedState = { items: [], status: 'idle' };

export const fetchDelisted = createAsyncThunk(
  'delisted/fetch',
  async ({ page = 0, limit = 100 }: { page?: number; limit?: number }) => {
    const res = await fetch(`/api/delisted?page=${page}&limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load delisted companies');
    const json = await res.json();
    return json.items as DelistedCompany[];
  },
);

const slice = createSlice({
  name: 'delisted',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<DelistedCompany[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchDelisted.pending, (s) => {
      s.status = 'loading';
    });
    b.addCase(fetchDelisted.fulfilled, (s, { payload }) => {
      s.items = payload;
      s.status = 'succeeded';
    });
    b.addCase(fetchDelisted.rejected, (s, { error }) => {
      s.status = 'failed';
      s.error = error.message;
    });
  },
});

export const { hydrate } = slice.actions;
export default slice.reducer;
