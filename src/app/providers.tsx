'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/src/app/shared/config/theme';
import ThemeRegistry from '@/src/app/providers/ThemeRegistry';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeRegistry>
  );
}
