import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import HistoricalMarketCapControls from '@/src/app/components/Dashboard/HistoricalMarketCap/components/HistoricalMarketCapControls';
import { renderWithTheme } from '@/src/app/tests/utils/render';

// useMediaQuery
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn().mockReturnValue(false), // по умолчанию десктоп
  };
});

describe('HistoricalMarketCapControls', () => {
  const tickers = ['AAPL', 'TSLA', 'AMZN'] as const;

  it('renders ticker select and range buttons', () => {
    renderWithTheme(
      <HistoricalMarketCapControls
        symbol="AAPL"
        days={30}
        onChangeSymbol={() => {}}
        onChangeDays={() => {}}
        tickers={tickers as any}
      />,
    );

    // Select label
    expect(screen.getByLabelText(/ticker/i)).toBeInTheDocument();

    // Range buttons
    expect(screen.getByRole('button', { name: /7d/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /30d/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /60d/i })).toBeInTheDocument();

    // Status text
    expect(screen.getByText(/showing last/i)).toHaveTextContent('Showing last 30d for AAPL');
  });

  it('calls onChangeSymbol when ticker changes', () => {
    const onChangeSymbol = jest.fn();
    renderWithTheme(
      <HistoricalMarketCapControls
        symbol="AAPL"
        days={7}
        onChangeSymbol={onChangeSymbol}
        onChangeDays={() => {}}
        tickers={tickers as any}
      />,
    );

    // open Select
    const select = screen.getByLabelText(/ticker/i);
    fireEvent.mouseDown(select);
    // choose TSLA
    const option = screen.getByRole('option', { name: 'TSLA' });
    fireEvent.click(option);

    expect(onChangeSymbol).toHaveBeenCalledWith('TSLA');
  });

  it('calls onChangeDays when range toggled', () => {
    const onChangeDays = jest.fn();
    renderWithTheme(
      <HistoricalMarketCapControls
        symbol="AAPL"
        days={7}
        onChangeSymbol={() => {}}
        onChangeDays={onChangeDays}
        tickers={tickers as any}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /30d/i }));
    expect(onChangeDays).toHaveBeenCalledWith(30);
  });
});
