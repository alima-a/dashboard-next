import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const renderWithTheme = (ui: React.ReactElement, opts?: Parameters<typeof render>[1]) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, opts);
};
