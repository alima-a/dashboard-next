'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/shared/config/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
}