import type { Metadata } from 'next';
import Providers from '@/src/app/providers';
import Layout from '@/src/app/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'My App',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
