import StockChartCard from '@/src/app/components/Dashboard/StockChartCard';
import { Grid, Box, Paper, Skeleton, Typography } from '@mui/material';
import PeersTableCard from '@/src/app/components/Dashboard/PeersTableCard';

export default async function DashboardPage() {
  // const data = await getItems();
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h5">Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <StockChartCard defaultSymbol="AAPL" defaultDays={60} title="Market snapshot" />
        </Grid>

        <Grid size={12}>
          <PeersTableCard title="Stock Peer Comparison" />
          {/*<Paper sx={{ p: 2 }}>*/}
          {/*  <Skeleton variant="text" width="30%" height={28} sx={{ mb: 1 }} />*/}
          {/*  <Skeleton variant="rectangular" height={56} sx={{ mb: 1 }} />*/}
          {/*  <Skeleton variant="rectangular" height={56} sx={{ mb: 1 }} />*/}
          {/*  <Skeleton variant="rectangular" height={56} sx={{ mb: 1 }} />*/}
          {/*  <Skeleton variant="rectangular" height={56} />*/}
          {/*</Paper>*/}
        </Grid>
      </Grid>
    </Box>
  );
}
