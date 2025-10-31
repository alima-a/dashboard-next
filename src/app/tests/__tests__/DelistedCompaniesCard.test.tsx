import * as React from 'react';
import { jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/src/app/tests/utils/render';
import DelistedCompaniesCard from '@/src/app/components/Dashboard/DelistedCompanies/DelistedCompaniesBlock';

// Mock useMediaQuery
const useMediaQueryMock = jest.fn().mockReturnValue(false);
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  // @ts-ignore
  return { ...actual, useMediaQuery: (q: any) => useMediaQueryMock(q) };
});

// Mock Redux selector with sample data
const sample = [
  { symbol: 'AAA', companyName: 'Alpha Inc', exchange: 'NYSE', ipoDate: '2010-01-01', delistedDate: '2020-01-01' },
  { symbol: 'BBB', companyName: 'Beta LLC', exchange: 'NASDAQ', ipoDate: '2012-05-02', delistedDate: '2021-07-03' },
];

jest.mock('@/src/app/store/hooks', () => ({
  useAppSelector: (fn: any) => fn({ delisted: { items: sample } }),
}));

// Mock the table to assert props propagation
jest.mock(
  '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedCompaniesTable',
  () =>
    function Proxy(props: any) {
      return (
        <div
          data-testid="table-proxy"
          data-mobile={String(props.isMobile)}
          data-length={String(props.data?.length ?? 0)}
          data-pagesize={String(props.pageSize)}
        />
      );
    },
);

describe('DelistedCompaniesCard', () => {
  beforeEach(() => {
    useMediaQueryMock.mockReset();
    useMediaQueryMock.mockReturnValue(false);
  });

  it('renders title and forwards data + isMobile to the table', () => {
    renderWithTheme(<DelistedCompaniesCard title="Delisted" />);

    expect(screen.getByText(/delisted/i)).toBeInTheDocument();

    const proxy = screen.getByTestId('table-proxy');
    expect(proxy).toHaveAttribute('data-length', '2');
    expect(proxy).toHaveAttribute('data-mobile', 'false');
    expect(proxy).toHaveAttribute('data-pagesize', '4');
  });

  it('sets isMobile=true on small screens', () => {
    useMediaQueryMock.mockReturnValue(true);
    renderWithTheme(<DelistedCompaniesCard title="Mobile Check" />);

    const proxy = screen.getByTestId('table-proxy');
    expect(proxy).toHaveAttribute('data-mobile', 'true');
  });
});
