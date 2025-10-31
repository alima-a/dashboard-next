'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';
import { Box, SelectChangeEvent, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import HistoricalMarketCapChart from '@/src/app/components/Dashboard/HistoricalMarketCap/components/HistoricalMarketCapChart';
import { useAppSelector } from '@/src/app/store/hooks';
import { MarketCapPoint, Ticker } from '@/src/app/types/fmp';
import HistoricalMarketCapControls from '@/src/app/components/Dashboard/HistoricalMarketCap/components/HistoricalMarketCapControls';

export const TICKERS = ['AAPL', 'TSLA', 'AMZN'] as Ticker[];

const colorByTicker: Record<Ticker, string> = {
  AAPL: '#10b981',
  TSLA: '#ef4444',
  AMZN: '#8b5cf6',
};

export interface StockChartCardProps {
  defaultSymbol?: Ticker;
  defaultDays?: 7 | 30 | 60;
  title?: string;
}

export const HistoricalMarketCapBlock: React.FC<StockChartCardProps> = ({
  defaultSymbol = 'AAPL',
  defaultDays = 60,
  title = 'Stocks overview',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [symbol, setSymbol] = useState<Ticker>(defaultSymbol);
  const [days, setDays] = useState<7 | 30 | 60>(defaultDays);

  // data: Record<Ticker, MarketCapPoint[]>
  const data = useAppSelector((s) => s.marketCaps.itemsBySymbol) as Record<
    Ticker,
    MarketCapPoint[]
  >;

  // Derive the series for the selected symbol and range
  const processedData = useMemo<MarketCapPoint[]>(() => {
    const series = data?.[symbol] ?? [];
    // keep last N points
    return series.slice(-days);
  }, [data, symbol, days]);

  return (
    <Box>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mb: 1.5, fontWeight: 600 }}>
        {title}
      </Typography>

      <HistoricalMarketCapControls
        symbol={symbol}
        days={days}
        onChangeSymbol={setSymbol}
        onChangeDays={setDays}
        tickers={TICKERS}
        isMobile={isMobile}
      />

      <Paper sx={{ p: 2, pt: 4, borderRadius: 2, minWidth: 0 }} elevation={3}>
        <Box
          sx={{
            position: 'relative',
            width: 1,
            maxWidth: '100%',
            minWidth: 0,
            height: { xs: 260, sm: 320, md: 380 },
            overflow: 'hidden',
            '& canvas': {
              display: 'block',
              width: '100% !important',
              height: '100% !important',
            },
          }}
        >
          <HistoricalMarketCapChart
            data={processedData}
            label={`${symbol} Market Cap (USD)`}
            color={colorByTicker[symbol]}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default HistoricalMarketCapBlock;
