'use client';
import { Provider } from 'react-redux';
import { store } from '@/src/app/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/src/app/shared/config/theme';
import ThemeRegistry from '@/src/app/ThemeRegistry';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeRegistry>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeRegistry>
    </Provider>
  );
}
