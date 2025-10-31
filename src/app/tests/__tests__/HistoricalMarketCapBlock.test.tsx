import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '@/src/app/tests/utils/render';
import HistoricalMarketCapBlock from '@/src/app/components/Dashboard/HistoricalMarketCap/HistoricalMarketCapBlock';

// Mock useMediaQuery desktop
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return { ...actual, useMediaQuery: jest.fn().mockReturnValue(false) };
});

const mockItemsBySymbol = {
  AAPL: [
    { date: '2025-10-24', marketCap: 20, symbol: 'AAPL' },
    { date: '2025-10-24', marketCap: 30, symbol: 'AAPL' },
    { date: '2025-10-25', marketCap: 40, symbol: 'AAPL' },
    { date: '2025-10-26', marketCap: 50, symbol: 'AAPL' },
    { date: '2025-10-27', marketCap: 60, symbol: 'AAPL' },
    { date: '2025-10-28', marketCap: 70, symbol: 'AAPL' },
    { date: '2025-10-29', marketCap: 80, symbol: 'AAPL' },
  ],
  TSLA: [
    { date: '2025-10-27', marketCap: 30, symbol: 'TSLA' },
    { date: '2025-10-28', marketCap: 40, symbol: 'TSLA' },
    { date: '2025-10-29', marketCap: 55, symbol: 'TSLA' },
  ],
  AMZN: [],
};

jest.mock('@/src/app/store/hooks', () => ({
  useAppSelector: (fn: any) => fn({ marketCaps: { itemsBySymbol: mockItemsBySymbol } }),
}));

// react-chartjs-2 mocked globally

describe('HistoricalMarketCapBlock', () => {
  beforeEach(() => {
    (window as any).__lastLineProps = undefined;
  });

  it('renders title and passes processed data (slice last N)', () => {
    renderWithTheme(
      <HistoricalMarketCapBlock defaultSymbol="AAPL" defaultDays={7} title="Stocks overview" />,
    );

    expect(screen.getByText(/stocks overview/i)).toBeInTheDocument();

    const props = (window as any).__lastLineProps;
    expect(props).toBeTruthy();
    expect(props.data.datasets[0].data).toEqual([20, 30, 40, 50, 60, 70, 80]);
    expect(props.data.datasets[0].label).toBe('AAPL Market Cap (USD)');
  });

  it('updates when symbol changed via controls', () => {
    renderWithTheme(<HistoricalMarketCapBlock defaultSymbol="AAPL" defaultDays={7} />);

    const select = screen.getByLabelText(/ticker/i);
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole('option', { name: 'TSLA' }));

    const props = (window as any).__lastLineProps;
    expect(props.data.datasets[0].data).toEqual([30, 40, 55]);
    expect(props.data.datasets[0].label).toBe('TSLA Market Cap (USD)');
  });

  it('updates when days changed via toggle buttons', () => {
    renderWithTheme(<HistoricalMarketCapBlock defaultSymbol="AAPL" defaultDays={7} />);

    fireEvent.click(screen.getByRole('button', { name: /60d/i }));
    let props = (window as any).__lastLineProps;
    expect(props.data.datasets[0].data).toEqual([20, 30, 40, 50, 60, 70, 80]);

    fireEvent.click(screen.getByRole('button', { name: /30d/i }));
    props = (window as any).__lastLineProps;
    expect(props.data.datasets[0].data).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });
});
