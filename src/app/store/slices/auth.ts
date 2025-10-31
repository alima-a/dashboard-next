import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isAuthenticated: boolean; // Флаг для UI/guard-логики
  user: { email?: string } | null; // При желании можно подгружать /me
  status: 'idle' | 'loading' | 'error';
  error?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
};

export const logoutThunk = createAsyncThunk<boolean, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (!res.ok) throw new Error('Logout failed');
      return true;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Logout failed') as any;
    }
  },
);

// вызывать после успешного POST /api/login (не обязательно, но удобно)
export const loginSucceeded = createAsyncThunk('auth/loginSucceeded', async () => true);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload ?? null;
    },
    resetAuthState() {
      return initialState;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginSucceeded.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    b.addCase(logoutThunk.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    b.addCase(logoutThunk.fulfilled, () => initialState);
    b.addCase(logoutThunk.rejected, (state, a) => {
      state.status = 'error';
      state.error = (a.payload as string) || 'Logout failed';
    });
  },
});

export const { setAuthenticated, setUser, resetAuthState } = slice.actions;
export default slice.reducer;
