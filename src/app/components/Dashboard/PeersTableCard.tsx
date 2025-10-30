'use client';

import * as React from 'react';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import PeersTable, { PeerItem } from './PeersTable';

const mockPeers: PeerItem[] = [
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    price: 426.51,
    mktCap: 3_360_000_000_000,
  },
  {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc. Class A',
    price: 165.12,
    mktCap: 2_070_000_000_000,
  },
  {
    symbol: 'GOOG',
    companyName: 'Alphabet Inc. Class C',
    price: 166.21,
    mktCap: 2_070_000_000_000,
  },
  { symbol: 'AMZN', companyName: 'Amazon.com, Inc.', price: 181.22, mktCap: 1_880_000_000_000 },
  { symbol: 'META', companyName: 'Meta Platforms, Inc.', price: 494.33, mktCap: 1_260_000_000_000 },
  { symbol: 'NVDA', companyName: 'NVIDIA Corporation', price: 118.77, mktCap: 2_900_000_000_000 },
  { symbol: 'TSLA', companyName: 'Tesla, Inc.', price: 236.14, mktCap: 750_000_000_000 },
  {
    symbol: 'IBM',
    companyName: 'International Business Machines Corporation',
    price: 186.42,
    mktCap: 170_000_000_000,
  },
  { symbol: 'ORCL', companyName: 'Oracle Corporation', price: 140.28, mktCap: 390_000_000_000 },
  { symbol: 'ADBE', companyName: 'Adobe Inc.', price: 540.12, mktCap: 240_000_000_000 },
  { symbol: 'CRM', companyName: 'Salesforce, Inc.', price: 289.41, mktCap: 280_000_000_000 },
  { symbol: 'CSCO', companyName: 'Cisco Systems, Inc.', price: 48.61, mktCap: 197_000_000_000 },
  { symbol: 'QCOM', companyName: 'QUALCOMM Incorporated', price: 171.66, mktCap: 190_000_000_000 },
  { symbol: 'AVGO', companyName: 'Broadcom Inc.', price: 170.1, mktCap: 790_000_000_000 },
  { symbol: 'AAPL', companyName: 'Apple Inc.', price: 227.1, mktCap: 3_420_000_000_000 },
  { symbol: 'GPRO', companyName: 'GoPro, Inc.', price: 0.9668, mktCap: 152_173_717 },
];

export interface TableCardProps {
  title: string;
}

const PeersTableCard: React.FC<TableCardProps> = ({ title = 'Stocks overview' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mb: 1.5, fontWeight: 600 }}>
        {title}
      </Typography>

      <PeersTable data={mockPeers} pageSize={4} isMobile={isMobile} />
    </Box>
  );
};

export default PeersTableCard;
