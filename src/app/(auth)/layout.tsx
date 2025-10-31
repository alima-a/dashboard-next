import type { Metadata } from 'next';
import Providers from '@/src/app/providers';
import React, { Suspense } from 'react';
import LoginFallback from '@/src/app/components/Login/LoginFallback';

export const metadata: Metadata = {
  title: 'Alima App',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Providers>{children}</Providers>
    </Suspense>
  );
}
