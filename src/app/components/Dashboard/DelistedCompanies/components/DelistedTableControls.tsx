'use client';

import * as React from 'react';
import { Stack, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

export interface DelistedTableControlsProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortAsc: boolean;
  onToggleSort: () => void;
  isMobile?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export default function DelistedTableControls({
  query,
  onQueryChange,
  sortAsc,
  onToggleSort,
  isMobile = false,
  leftSlot,
  rightSlot,
}: DelistedTableControlsProps) {
  return (
    <>
      {/* Top row: search (and optional filter slots) */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.25}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flex: 1 }}>
          {leftSlot}
          <TextField
            size="small"
            placeholder="Search by Company"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: query ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    size="small"
                    onClick={() => onQueryChange('')}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{ minWidth: { xs: '100%', sm: 280 } }}
          />
        </Stack>

        {rightSlot}
      </Stack>

      {/* Mobile-only: compact sort button row */}
      {isMobile && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Tooltip title={`Sort ${sortAsc ? 'A→Z' : 'Z→A'}`}>
            <IconButton aria-label="sort by company" size="small" onClick={onToggleSort}>
              <SortByAlphaIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </>
  );
}
