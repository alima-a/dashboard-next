'use client';

import * as React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import DelistedCompaniesTable from './components/DelistedCompaniesTable';
import { useAppSelector } from '@/src/app/store/hooks';
import { DelistedCompany } from '@/src/app/types/fmp';

export interface DelistedCompaniesCardProps {
  title: string;
}

const DelistedCompaniesCard: React.FC<DelistedCompaniesCardProps> = ({
  title = 'Stocks overview',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const data = useAppSelector((s) => s.delisted.items) as DelistedCompany[];

  return (
    <Box>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mb: 1.5, fontWeight: 600 }}>
        {title}
      </Typography>

      <DelistedCompaniesTable data={data} pageSize={4} isMobile={isMobile} />
    </Box>
  );
};

export default DelistedCompaniesCard;
