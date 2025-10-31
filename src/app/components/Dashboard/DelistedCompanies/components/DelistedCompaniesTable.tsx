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
} from '@mui/material';
import { useEffect } from 'react';
import DelistedCompaniesMobileCards from '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedCompaniesMobileCards';
import DelistedTableControls from '@/src/app/components/Dashboard/DelistedCompanies/components/DelistedTableControls';

/** Matches FMP delisted endpoint items */
export type DelistedCompany = {
  symbol: string;
  companyName: string;
  exchange: string;
  ipoDate: string; // "YYYY-MM-DD"
  delistedDate: string; // "YYYY-MM-DD"
};

export interface DelistedTableProps {
  data: DelistedCompany[];
  pageSize?: number; // default 4
  isMobile?: boolean;
}

const DelistedCompaniesTable: React.FC<DelistedTableProps> = ({
  data,
  pageSize = 4,
  isMobile = false,
}) => {
  const [page, setPage] = React.useState(1);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [query, setQuery] = React.useState('');

  // Search by name
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((d) => (d.companyName ?? '').toLowerCase().includes(q));
  }, [data, query]);

  // Sort by company name A↔Z
  const sortedData = React.useMemo(() => {
    return [...filtered].sort((a, b) => {
      const A = (a.companyName ?? '').toLowerCase();
      const B = (b.companyName ?? '').toLowerCase();
      if (A < B) return sortAsc ? -1 : 1;
      if (A > B) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filtered, sortAsc]);

  const total = sortedData.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const slice = sortedData.slice(start, start + pageSize);

  const fmtDate = (s?: string) => (s ? new Date(s).toISOString().slice(0, 10) : '-');

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  return (
    <Paper elevation={2} sx={{ p: 2, pt: 4, borderRadius: 2 }}>
      <DelistedTableControls
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
        }}
        sortAsc={sortAsc}
        onToggleSort={() => {
          setSortAsc((s) => !s);
          setPage(1);
        }}
        isMobile={isMobile}
      />

      {/* Desktop table */}
      {!isMobile ? (
        <TableContainer component={Box}>
          <Table size="small" aria-label="delisted table">
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
                <TableCell width={160}>Exchange</TableCell>
                <TableCell width={140}>IPO</TableCell>
                <TableCell width={140}>Delisted</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {slice.map((row, idx) => (
                <TableRow key={`${row.symbol}-${row.delistedDate}`} hover>
                  <TableCell align="right">{start + idx + 1}</TableCell>
                  <TableCell>
                    <Typography fontWeight={700}>{row.symbol}</Typography>
                  </TableCell>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell>{row.exchange}</TableCell>
                  <TableCell>{fmtDate(row.ipoDate)}</TableCell>
                  <TableCell>{fmtDate(row.delistedDate)}</TableCell>
                </TableRow>
              ))}

              {slice.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography color="text.secondary">No data</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Mobile cards
        <>
          <DelistedCompaniesMobileCards items={slice} startIndex={start} />
          {slice.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: 'center', my: 2 }}>
              No data
            </Typography>
          )}
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: isMobile ? 2 : 'auto' }}>
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

export default DelistedCompaniesTable;
