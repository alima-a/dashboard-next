import { configureStore } from '@reduxjs/toolkit';
import theme from '@/features/theme/themeSlice';
import table from '@/features/table/tableSlice';
import auth from '@/features/auth/authSlice';

export const store = configureStore({
    reducer: { theme, table, auth },
    middleware: (gdm) => gdm({ serializableCheck: false })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;