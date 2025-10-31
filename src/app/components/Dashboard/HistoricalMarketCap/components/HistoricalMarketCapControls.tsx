'use client';

import * as React from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Ticker } from '@/src/app/types/fmp';
import theme from '@/src/app/shared/config/theme';

export interface HistoricalMarketCapControlsProps {
  symbol: Ticker;
  days: 7 | 30 | 60;
  onChangeSymbol: (t: Ticker) => void;
  onChangeDays: (d: 7 | 30 | 60) => void;
  tickers: Ticker[]; // pass TICKERS from parent
  isMobile?: boolean; // to tweak paddings/elevation
}

/** Settings panel: ticker select + range toggles + status text */
export default function HistoricalMarketCapControls({
  symbol,
  days,
  onChangeSymbol,
  onChangeDays,
  tickers,
  isMobile = false,
}: HistoricalMarketCapControlsProps) {
  const handleSymbol = (e: SelectChangeEvent<string>) => {
    onChangeSymbol(e.target.value as Ticker);
  };

  const handleDays = (_: React.MouseEvent<HTMLElement>, val: 7 | 30 | 60 | null) => {
    if (val) onChangeDays(val);
  };

  return (
    <Paper
      elevation={isMobile ? 0 : 2}
      sx={{
        p: 2,
        pt: 4,
        mb: { xs: 1.5, sm: 3 },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        borderRadius: 2,
        boxShadow: theme.shadows[2],
      }}
    >
      {/* Ticker — full width on mobile */}
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
          {tickers.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
          '& .MuiToggleButton-root': { flex: '0 0 auto' },
        }}
      >
        <ToggleButton value={7}>7d</ToggleButton>
        <ToggleButton value={30}>30d</ToggleButton>
        <ToggleButton value={60}>60d</ToggleButton>
      </ToggleButtonGroup>

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
  );
}
