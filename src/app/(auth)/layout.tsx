import type { Metadata } from 'next';
import Providers from '@/src/app/providers';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Alima App',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <Providers>{children}</Providers>
    </Suspense>
  );
}
