import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/src/app/tests/utils/render';
import DelistedCompaniesMobileCards
  from '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedCompaniesMobileCards';

const items = [
  { symbol: 'ZZZ', companyName: 'Zeta Corp', exchange: 'NYSE', ipoDate: '2001-01-01', delistedDate: '2015-02-02' },
  { symbol: 'YYY', companyName: 'Yankee Co', exchange: 'NASDAQ', ipoDate: '2002-03-03', delistedDate: '2016-04-04' },
];

describe('DelistedCompaniesMobileCards', () => {
  it('renders cards with numbering and fields', () => {
    renderWithTheme(<DelistedCompaniesMobileCards items={items} startIndex={4} />);

    // Company names
    expect(screen.getByText('Zeta Corp')).toBeInTheDocument();
    expect(screen.getByText('Yankee Co')).toBeInTheDocument();

    // Symbols (via Chip labels)
    expect(screen.getByText('ZZZ')).toBeInTheDocument();
    expect(screen.getByText('YYY')).toBeInTheDocument();

    // Row numbers (#5 and #6 given startIndex=4)
    expect(screen.getByText('#5')).toBeInTheDocument();
    expect(screen.getByText('#6')).toBeInTheDocument();

    // Formatted dates ISO-like (yyyy-mm-dd)
    expect(
      screen.getByText((_, node) => node?.tagName === 'P' && /IPO:\s*2001-01-01/i.test(node.textContent || '')),
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, node) => node?.tagName === 'P' && /Delisted:\s*2015-02-02/i.test(node.textContent || '')),
    ).toBeInTheDocument();
  });
});
