import type { Metadata } from 'next';
import Providers from '@/src/app/providers';

export const metadata: Metadata = {
  title: 'My App',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
