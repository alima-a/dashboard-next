'use client';

import * as React from 'react';
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

export type PeerItem = {
  symbol: string;
  companyName: string;
  price: number;
  mktCap: number;
};

export interface PeersTableProps {
  data: PeerItem[];
  title?: string;
  pageSize?: number; // по ТЗ 4
  isMobile?: boolean;
}

const PeersTable: React.FC<PeersTableProps> = ({ data, pageSize = 4, isMobile = false }) => {
  const [page, setPage] = React.useState(1);
  const [sortAsc, setSortAsc] = React.useState(true);

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const A = a.companyName.toLowerCase();
      const B = b.companyName.toLowerCase();
      if (A < B) return sortAsc ? -1 : 1;
      if (A > B) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortAsc]);

  const total = sortedData.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const slice = sortedData.slice(start, start + pageSize);

  const fmtCurrency = (v: number) =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(v);

  const fmtCap = (v: number) =>
    new Intl.NumberFormat(undefined, {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(v);

  return (
    <Paper elevation={2} sx={{ p: 2, pt: 4 }}>
      {isMobile && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Tooltip title={`Sort ${sortAsc ? 'A→Z' : 'Z→A'}`}>
            <IconButton
              aria-label="sort by company"
              size="small"
              onClick={() => {
                setSortAsc((s) => !s);
                setPage(1);
              }}
            >
              <SortByAlphaIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}

      {/* Desktop */}
      {!isMobile ? (
        <TableContainer component={Box}>
          <Table size="small" aria-label="peers table">
            <TableHead>
              <TableRow>
                <TableCell width={72} align="right">
                  #
                </TableCell>
                <TableCell width={120}>Symbol</TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={sortAsc ? 'asc' : 'desc'}
                    onClick={() => {
                      setSortAsc((s) => !s);
                      setPage(1);
                    }}
                  >
                    Company
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" width={140}>
                  Price
                </TableCell>
                <TableCell align="right" width={160}>
                  Market Cap
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {slice.map((row, idx) => (
                <TableRow key={row.symbol} hover>
                  <TableCell align="right">{start + idx + 1}</TableCell>
                  <TableCell>
                    <Typography fontWeight={700}>{row.symbol}</Typography>
                  </TableCell>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell align="right">{fmtCurrency(row.price)}</TableCell>
                  <TableCell align="right">{fmtCap(row.mktCap)}</TableCell>
                </TableRow>
              ))}

              {slice.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography color="text.secondary">No data</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        /* Mobile */
        <Stack spacing={1.25}>
          {slice.map((row, idx) => (
            <Card key={row.symbol} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ py: 1.25, '&:last-child': { pb: 1.25 } }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Chip size="small" label={row.symbol} sx={{ fontWeight: 700 }} />
                  <Typography variant="caption" color="text.secondary">
                    #{start + idx + 1}
                  </Typography>
                </Stack>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.25 }}>
                  {row.companyName}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="baseline">
                  <Typography variant="body2">
                    Price: <b>{fmtCurrency(row.price)}</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mkt Cap: <b>{fmtCap(row.mktCap)}</b>
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}

          {slice.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: 'center', my: 2 }}>
              No data
            </Typography>
          )}
        </Stack>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          page={page}
          onChange={(_, v) => setPage(v)}
          count={pages}
          shape="rounded"
          size={isMobile ? 'small' : 'medium'}
          siblingCount={0}
        />
      </Box>
    </Paper>
  );
};

export default PeersTable;
