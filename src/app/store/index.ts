import { configureStore } from '@reduxjs/toolkit';
import marketCapsReducer from './slices/marketCaps';
import delistedReducer from './slices/delisted';

export function makeStore(preloadedState?: unknown) {
  return configureStore({
    reducer: {
      marketCaps: marketCapsReducer,
      delisted: delistedReducer,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
