import { getItems } from '@/shared/lib/fetchers';
import Chart from '@/shared/ui/Chart';
import DataTable from '@/shared/ui/DataTable';

export default async function DashboardPage() {
    const data = await getItems();
    return (
        <main style={{ padding: 24 }}>
            <h1>Dashboard</h1>
            <Chart items={data.items} />
            <DataTable rows={data.items} />
        </main>
    );
}