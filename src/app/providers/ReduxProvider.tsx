'use client';

import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/src/app/store';

type ReduxProviderProps = PropsWithChildren<{ preloadedState?: unknown }>;

export default function ReduxProvider({ preloadedState, children }: ReduxProviderProps) {
  const storeRef = useRef<AppStore | null>(null); // ✅ начальное значение
  if (storeRef.current === null) {
    storeRef.current = makeStore(preloadedState); // создаём один раз
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
