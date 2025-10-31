import * as React from 'react';
import { jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/src/app/tests/utils/render';

import DelistedTableControls from '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedTableControls';

describe('DelistedTableControls', () => {
  it('calls onQueryChange when typing', async () => {
    const onQueryChange = jest.fn();
    const onToggleSort = jest.fn();

    renderWithTheme(
      <DelistedTableControls
        query=""
        onQueryChange={onQueryChange}
        sortAsc
        onToggleSort={onToggleSort}
      />,
    );

    const input = screen.getByPlaceholderText(/search by company/i);
    await userEvent.type(input, 'alp');
    expect(onQueryChange).toHaveBeenCalledTimes(3);
  });

  it('shows mobile sort button and toggles sort on click', async () => {
    const onQueryChange = jest.fn();
    const onToggleSort = jest.fn();

    renderWithTheme(
      <DelistedTableControls
        query=""
        onQueryChange={onQueryChange}
        sortAsc={false}
        onToggleSort={onToggleSort}
        isMobile
      />,
    );

    const sortBtn = screen.getByRole('button', { name: /sort by company/i });
    await userEvent.click(sortBtn);
    expect(onToggleSort).toHaveBeenCalled();
  });
});
