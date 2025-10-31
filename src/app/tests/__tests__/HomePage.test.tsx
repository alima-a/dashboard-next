import * as React from 'react';
import { jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/src/app/tests/utils/render';

// ⚠️ Adjust the import path to your project structure
import HomePage from '@/src/app/(app)/home/page';
// Mock next/navigation -> useRouter.push
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock MUI useMediaQuery so we can simulate mobile/desktop
const useMediaQueryMock = jest.fn().mockReturnValue(false);
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  // @ts-ignore
  return { ...actual, useMediaQuery: (q: any) => useMediaQueryMock(q) };
});

describe('HomePage', () => {
  beforeEach(() => {
    pushMock.mockReset();
    useMediaQueryMock.mockReset();
    useMediaQueryMock.mockReturnValue(false); // default: desktop
  });

  it('renders the welcome heading, description and CTA', () => {
    renderWithTheme(<HomePage />);

    // Heading and body text should be visible
    expect(screen.getByRole('heading', { name: /welcome!/i })).toBeInTheDocument();
    expect(
      screen.getByText(/welcome to my test project/i),
    ).toBeInTheDocument();

    // CTA button should be present
    expect(screen.getByRole('button', { name: /go to dashboard/i })).toBeInTheDocument();
  });

  it('navigates to /dashboard when CTA is clicked', async () => {
    renderWithTheme(<HomePage />);

    await userEvent.click(screen.getByRole('button', { name: /go to dashboard/i }));
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });

  it('uses h4 variant on desktop (non-mobile)', () => {
    useMediaQueryMock.mockReturnValue(false); // desktop
    renderWithTheme(<HomePage />);

    // Typography with variant="h4" maps to an <h4> element by default
    const heading = screen.getByRole('heading', { name: /welcome!/i });
    expect(heading.tagName.toLowerCase()).toBe('h4');
  });

  it('uses h6 variant on mobile', () => {
    useMediaQueryMock.mockReturnValue(true); // mobile
    renderWithTheme(<HomePage />);

    // Typography with variant="h6" maps to an <h6> element by default
    const heading = screen.getByRole('heading', { name: /welcome!/i });
    expect(heading.tagName.toLowerCase()).toBe('h6');
  });
});
