import { configureStore } from '@reduxjs/toolkit';
// import theme from '@/app/features/theme/themeSlice';
import table from '@/src/app/features/table/tableSlice';
// import auth from '@/app/features/auth/authSlice';

export const store = configureStore({
  reducer: { table },
  middleware: (gdm) => gdm({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
