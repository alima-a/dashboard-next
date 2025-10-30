'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import StockChart from '@/src/app/components/Dashboard/StockChart';
import { useStockSeries } from '@/src/app/hooks/useStockSeries';
import { TICKERS, type Ticker } from '@/src/app/mockData';

const colorByTicker: Record<Ticker, string> = {
  AAPL: '#10b981',
  TSLA: '#ef4444',
  MSFT: '#3b82f6',
  GOOG: '#f59e0b',
  AMZN: '#8b5cf6',
};

export interface StockChartCardProps {
  defaultSymbol?: Ticker;
  defaultDays?: 7 | 30 | 60;
  title?: string;
}

export const StockChartCard: React.FC<StockChartCardProps> = ({
  defaultSymbol = 'AAPL',
  defaultDays = 60,
  title = 'Stocks overview',
}) => {
  const [symbol, setSymbol] = useState<Ticker>(defaultSymbol);
  const [days, setDays] = useState<7 | 30 | 60 | 90>(defaultDays);
  const { data } = useStockSeries(symbol, days);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSymbol = (e: SelectChangeEvent<string>) => setSymbol(e.target.value as Ticker);
  const handleDays = (_: React.MouseEvent<HTMLElement>, val: 7 | 30 | 60 | 90 | null) => {
    if (val) setDays(val);
  };

  return (
    <Box>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mb: 1.5, fontWeight: 600 }}>
        {title}
      </Typography>

      <Paper
        elevation={isMobile ? 0 : 2}
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: { xs: 1.5, sm: 3 },
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          borderRadius: { xs: 0, sm: 2 },
        }}
      >
        {/* Тикер — на мобиле во всю ширину */}
        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 160 } }}>
          <InputLabel id="ticker-label">Ticker</InputLabel>
          <Select
            labelId="ticker-label"
            value={symbol}
            label="Ticker"
            onChange={handleSymbol}
            MenuProps={{ disableScrollLock: true }}
            fullWidth
          >
            {TICKERS.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Диапазон — скроллится горизонтально на мобиле */}
        <ToggleButtonGroup
          size="small"
          exclusive
          value={days}
          onChange={handleDays}
          aria-label="range"
          sx={{
            flex: { xs: '1 1 100%', sm: '0 0 auto' },
            overflowX: { xs: 'auto', sm: 'visible' },
            whiteSpace: { xs: 'nowrap', sm: 'normal' },
            px: { xs: 0.5, sm: 0 },
            '& .MuiToggleButton-root': {
              flex: { xs: '0 0 auto', sm: '0 0 auto' },
            },
          }}
        >
          <ToggleButton value={7}>7d</ToggleButton>
          <ToggleButton value={30}>30d</ToggleButton>
          <ToggleButton value={60}>60d</ToggleButton>
        </ToggleButtonGroup>

        {/* Текст — уходит вниз и выравнивается влево на мобиле */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            ml: { xs: 0, sm: 'auto' },
            width: { xs: '100%', sm: 'auto' },
            textAlign: { xs: 'left', sm: 'right' },
            pt: { xs: 0.5, sm: 0 },
          }}
        >
          Showing last <b>{days}d</b> for <b>{symbol}</b>
        </Typography>
      </Paper>

      <Paper sx={{ p: { xs: 1, md: 2 }, borderRadius: { xs: 0, sm: 2 } }} elevation={3}>
        <Box sx={{ height: { xs: 260, sm: 320, md: 380 } }}>
          <StockChart data={data} label={`${symbol} Price (USD)`} color={colorByTicker[symbol]} />
        </Box>
      </Paper>
    </Box>
  );
};

export default StockChartCard;
