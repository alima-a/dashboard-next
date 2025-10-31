import { createTheme } from '@mui/material/styles';
export default createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7C3AED' },
    secondary: { main: '#06B6D4' },
    background: { default: '#F9FAFB' },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
  },
  shape: { borderRadius: 2 },
});
