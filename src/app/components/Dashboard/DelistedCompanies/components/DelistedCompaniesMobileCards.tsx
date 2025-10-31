'use client';

import * as React from 'react';
import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DelistedCompany } from '@/src/app/types/fmp';

export interface DelistedMobileCardsProps {
  items: DelistedCompany[];
  /** start index for row numbering (e.g., (page-1)*pageSize) */
  startIndex?: number;
}

/** Mobile-friendly list of delisted companies as cards */
export default function DelistedCompaniesMobileCards({
  items,
  startIndex = 0,
}: DelistedMobileCardsProps) {
  const fmtDate = (s?: string) => (s ? new Date(s).toISOString().slice(0, 10) : '-');

  return (
    <Stack spacing={1.25}>
      {items.map((row, idx) => (
        <Card key={`${row.symbol}-${row.delistedDate}`} variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ py: 1.25, '&:last-child': { pb: 1.25 } }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 0.5 }}
            >
              <Chip size="small" label={row.symbol} sx={{ fontWeight: 700 }} />
              <Typography variant="caption" color="text.secondary">
                #{startIndex + idx + 1}
              </Typography>
            </Stack>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.25 }}>
              {row.companyName}
            </Typography>

            <Stack spacing={0.25}>
              <Typography variant="body2">
                Exchange: <b>{row.exchange}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                IPO: <b>{fmtDate(row.ipoDate)}</b> · Delisted: <b>{fmtDate(row.delistedDate)}</b>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
