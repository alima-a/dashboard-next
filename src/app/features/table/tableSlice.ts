import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Sort = 'asc' | 'desc';
interface State { filters: Record<string, string>; sortKey?: string; sortDir: Sort }
const initialState: State = { filters: {}, sortDir: 'asc' };

const slice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setFilter: (s, a: PayloadAction<{ key: string; value: string }>) => { s.filters[a.payload.key] = a.payload.value; },
        clearFilters: (s) => { s.filters = {}; },
        setSort: (s, a: PayloadAction<{ key: string; dir: Sort }>) => { s.sortKey = a.payload.key; s.sortDir = a.payload.dir; },
    },
});
export const { setFilter, clearFilters, setSort } = slice.actions;
export default slice.reducer;
