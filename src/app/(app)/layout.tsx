import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Providers from '@/app/providers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const token = cookies().get('token')?.value;
    if (!token) redirect('/login')
    return <Providers>{children}</Providers>;
}