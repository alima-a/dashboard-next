import * as React from 'react';
import { jest } from '@jest/globals';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/src/app/tests/utils/render';
import DelistedCompaniesTable from '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedCompaniesTable';

// Mock mobile cards for mobile mode
jest.mock(
  '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedCompaniesMobileCards',
  () =>
    function MobileProxy(props: any) {
      return (
        <div
          data-testid="mobile-cards-proxy"
          data-length={String(props.items?.length ?? 0)}
          data-start={String(props.startIndex ?? 0)}
        />
      );
    },
);

const rows = [
  { symbol: 'AAA', companyName: 'Alpha Inc', exchange: 'NYSE',   ipoDate: '2010-01-01', delistedDate: '2020-01-01' },
  { symbol: 'BBB', companyName: 'Beta LLC',  exchange: 'NASDAQ', ipoDate: '2012-05-02', delistedDate: '2021-07-03' },
  { symbol: 'CCC', companyName: 'Gamma SA',  exchange: 'NYSE',   ipoDate: '2015-02-03', delistedDate: '2022-09-11' },
  { symbol: 'DDD', companyName: 'Delta PLC', exchange: 'NYSE',   ipoDate: '2016-06-06', delistedDate: '2023-10-10' },
];

const getTable = () => screen.getByRole('table', { name: /delisted table/i });

describe('DelistedCompaniesTable (desktop)', () => {
  it('renders sorted asc by company name by default', () => {
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={10} isMobile={false} />);

    const body = within(getTable()).getAllByRole('row').slice(1); // skip header
    const companies = body.map((r) => within(r).getAllByRole('cell')[2].textContent?.trim());
    // Asc: Alpha, Beta, Delta, Gamma
    expect(companies).toEqual(['Alpha Inc', 'Beta LLC', 'Delta PLC', 'Gamma SA']);
  });

  it('toggles sort when clicking the header sort label', async () => {
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={10} isMobile={false} />);

    // Click the "Company" sort label to switch to desc
    const sortLabel = screen.getByText(/company/i).closest('[role="button"]')!;
    await userEvent.click(sortLabel);

    const body = within(getTable()).getAllByRole('row').slice(1);
    const companies = body.map((r) => within(r).getAllByRole('cell')[2].textContent?.trim());
    // Desc: Gamma, Delta, Beta, Alpha
    expect(companies).toEqual(['Gamma SA', 'Delta PLC', 'Beta LLC', 'Alpha Inc']);
  });

  it('filters by company name via the search input', async () => {
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={10} isMobile={false} />);

    const input = screen.getByPlaceholderText(/search by company/i);
    await userEvent.type(input, 'alp'); // matches "Alpha Inc"

    const body = within(getTable()).getAllByRole('row').slice(1);
    const companies = body.map((r) => within(r).getAllByRole('cell')[2].textContent?.trim());
    expect(companies).toEqual(['Alpha Inc']);
  });

  it('shows "No data" when filter eliminates all rows', async () => {
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={10} isMobile={false} />);

    const input = screen.getByPlaceholderText(/search by company/i);
    await userEvent.type(input, 'zzz'); // no matches

    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('paginates rows with pageSize=2', async () => {
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={2} isMobile={false} />);

    // Page 1: rows 1..2 → Alpha, Beta
    let body = within(getTable()).getAllByRole('row').slice(1);
    let companies = body.map((r) => within(r).getAllByRole('cell')[2].textContent?.trim());
    expect(companies).toEqual(['Alpha Inc', 'Beta LLC']);

    // Go to page 2
    await userEvent.click(screen.getByRole('button', { name: /2/i }));
    body = within(getTable()).getAllByRole('row').slice(1);
    companies = body.map((r) => within(r).getAllByRole('cell')[2].textContent?.trim());
    expect(companies).toEqual(['Delta PLC', 'Gamma SA']); // still asc by default
  });
});

describe('DelistedCompaniesTable (mobile)', () => {
  it('renders mobile cards instead of table and forwards slice + startIndex', async () => {
    // pageSize=3 => page 1 slice is first 3 elements, startIndex=0
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={3} isMobile />);

    const proxy = screen.getByTestId('mobile-cards-proxy');
    expect(proxy).toHaveAttribute('data-length', '3');
    expect(proxy).toHaveAttribute('data-start', '0');

    // Go to page 2 => one remaining row, startIndex=3
    await userEvent.click(screen.getByRole('button', { name: /2/i }));
    const proxy2 = screen.getByTestId('mobile-cards-proxy');
    expect(proxy2).toHaveAttribute('data-length', '1');
    expect(proxy2).toHaveAttribute('data-start', '3');
  });

  it('shows "No data" text on mobile when filtered out', async () => {
    renderWithTheme(<DelistedCompaniesTable data={rows} pageSize={3} isMobile />);

    const input = screen.getByPlaceholderText(/search by company/i);
    await userEvent.type(input, 'zzz');

    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});