import * as React from 'react';
import { jest } from '@jest/globals';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/src/app/tests/utils/render';

import LoginPage from '@/src/app/(auth)/auth/login/page';

// Mock MUI useMediaQuery
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  // @ts-ignore
  return { ...actual, useMediaQuery: jest.fn().mockReturnValue(false) };
});

// Mock next/navigation hooks
const replaceMock = jest.fn();
let searchParamsMock = new URLSearchParams('');

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => searchParamsMock,
}));

// Mock window.alert
const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

// Helpers
const getEmail = () => screen.getByLabelText(/email/i);
const getPassword = () => screen.getByLabelText(/password/i);
const getSubmit = () => screen.getByRole('button', { name: /log in|logging in/i });

describe('LoginPage', () => {
  beforeEach(() => {
    replaceMock.mockReset();
    alertMock.mockClear();
    searchParamsMock = new URLSearchParams('');
    // Clear previous mock fetch
    // @ts-expect-error - override global fetch
    global.fetch = undefined;
  });

  it('renders title and form fields', () => {
    renderWithTheme(<LoginPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(getEmail()).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(getSubmit()).toBeInTheDocument();
  });

  it('shows validation errors on empty submit and does not call fetch', async () => {
    const fetchSpy = jest.fn();
    // @ts-expect-error override
    global.fetch = fetchSpy;

    renderWithTheme(<LoginPage />);
    await userEvent.click(getSubmit());

    // validation messages
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('shows min length error for a short password', async () => {
    renderWithTheme(<LoginPage />);
    await userEvent.type(getEmail(), 'user@example.com');
    await userEvent.type(getPassword(), '123'); // too short
    await userEvent.click(getSubmit());

    expect(await screen.findByText(/min 6 chars/i)).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('redirects to ?from=... when login succeeds', async () => {
    // ?from=/dashboard
    searchParamsMock = new URLSearchParams('from=/dashboard');

    // Mock successful response
    // @ts-expect-error override
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    renderWithTheme(<LoginPage />);
    await userEvent.type(getEmail(), 'user@example.com');
    await userEvent.type(getPassword(), '123456');
    await userEvent.click(getSubmit());

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/dashboard'));
    expect(alertMock).not.toHaveBeenCalled();
  });

  it('redirects to /home when login succeeds without ?from', async () => {
    // @ts-expect-error override
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    renderWithTheme(<LoginPage />);
    await userEvent.type(getEmail(), 'user@example.com');
    await userEvent.type(getPassword(), '123456');
    await userEvent.click(getSubmit());

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/home'));
  });

  it('shows alert on invalid credentials', async () => {
    // Mock failed login
    // @ts-expect-error override
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    renderWithTheme(<LoginPage />);
    await userEvent.type(getEmail(), 'user@example.com');
    await userEvent.type(getPassword(), '123456');
    await userEvent.click(getSubmit());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Invalid credentials'));
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('disables the button and shows "Logging in..." while submitting', async () => {
    let resolveFetch: (v: any) => void;

    // Simulate slow fetch to test intermediate UI state
    // @ts-expect-error override
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((res) => {
          resolveFetch = res;
        }),
    );

    renderWithTheme(<LoginPage />);
    await userEvent.type(getEmail(), 'user@example.com');
    await userEvent.type(getPassword(), '123456');
    await userEvent.click(getSubmit());

    // During fetch: button should be disabled and display "Logging in..."
    expect(getSubmit()).toBeDisabled();
    expect(getSubmit()).toHaveTextContent(/logging in/i);

    // Finish the pending request
    await act(async () => {
      resolveFetch({ ok: true });
    });

    // After completion: redirect and button re-enabled
    await waitFor(() => expect(replaceMock).toHaveBeenCalled());
    expect(getSubmit()).not.toBeDisabled();
    expect(getSubmit()).toHaveTextContent(/log in/i);
  });
});