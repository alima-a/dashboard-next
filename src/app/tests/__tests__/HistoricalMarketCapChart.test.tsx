import * as React from 'react';
import { screen } from '@testing-library/react';
import HistoricalMarketCapChart from '@/src/app/components/Dashboard/HistoricalMarketCap/components/HistoricalMarketCapChart';
import { renderWithTheme } from '@/src/app/tests/utils/render';
// Mock useMediaQuery
const useMediaQueryMock = jest.fn().mockReturnValue(false);
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return { ...actual, useMediaQuery: (q: any) => useMediaQueryMock(q) };
});

// react-chartjs-2 mocked in __mocks__/react-chartjs-2.tsx

const mk = (d: Partial<Parameters<typeof HistoricalMarketCapChart>[0]> = {}) => ({
  data: [
    { date: '2025-10-30', marketCap: 100, symbol: 'AAPL' },
    { date: '2025-10-28', marketCap: 70, symbol: 'AAPL' },
    { date: '2025-10-29', marketCap: 85, symbol: 'AAPL' },
  ],
  label: 'AAPL Market Cap',
  color: '#10b981',
  compactTicks: true,
  locale: 'en-US',
  currency: 'USD',
  ...d,
});

describe('HistoricalMarketCapChart', () => {
  beforeEach(() => {
    (window as any).__lastLineProps = undefined;
  });

  it('sorts data by date asc and passes to Line with options', () => {
    renderWithTheme(<HistoricalMarketCapChart {...mk()} />);
    const stub = screen.getByTestId('mock-line');
    expect(stub).toBeInTheDocument();

    const props = (window as any).__lastLineProps;
    expect(props).toBeTruthy();

    // Check data: 28 -> 29 -> 30
    const ds = props.data.datasets[0].data;
    expect(ds).toEqual([70, 85, 100]);

    // Options
    expect(props.options.maintainAspectRatio).toBe(false);
    expect(props.options.plugins.legend.display).toBe(true);
    expect(props.data.datasets[0].borderColor).toBe('#10b981');
    expect(props.data.datasets[0].fill).toBe(true);
  });

  it('mobile: disables animation and reduces ticks/legend', () => {
    useMediaQueryMock.mockReturnValueOnce(true); // mobile state
    renderWithTheme(<HistoricalMarketCapChart {...mk()} />);

    const props = (window as any).__lastLineProps;
    expect(props.options.animation.duration).toBe(0);
    expect(props.options.plugins.legend.display).toBe(false);
    expect(props.options.scales.y.ticks.maxTicksLimit).toBe(4);
  });
});
