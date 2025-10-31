import HistoricalMarketCapBlock from '@/src/app/components/Dashboard/HistoricalMarketCap/HistoricalMarketCapBlock';
import { Grid, Box, Typography } from '@mui/material';
import DelistedCompaniesCard from '@/src/app/components/Dashboard/DelistedCompanies/DelistedCompaniesBlock';
import { MarketCapPoint, Ticker } from '@/src/app/types/fmp';
import { getDelisted, getMarketCaps } from '@/src/app/lib/fmp';
import ReduxProvider from '@/src/app/providers/ReduxProvider';

export const revalidate = 600;

const DEFAULT_TICKERS: Ticker[] = ['AAPL', 'TSLA', 'AMZN'];

export default async function DashboardPage() {
  const [marketCaps, delisted] = await Promise.all([
    getMarketCaps(DEFAULT_TICKERS, 3600),
    getDelisted(0, 100, 1800), // берём максимум 100 для клиентской пагинации
  ]);

  const preloadedState = {
    marketCaps: {
      itemsBySymbol: marketCaps as Record<Ticker, MarketCapPoint[]>,
      status: 'succeeded' as const,
    },
    delisted: { items: delisted, status: 'succeeded' as const },
  };

  return (
    <ReduxProvider preloadedState={preloadedState}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5">Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid size={12}>
            <HistoricalMarketCapBlock
              defaultSymbol="AAPL"
              defaultDays={60}
              title="Historical market capitalozatin"
            />
          </Grid>

          <Grid size={12}>
            <DelistedCompaniesCard title="Delisted companies" />
          </Grid>
        </Grid>
      </Box>
    </ReduxProvider>
  );
}
