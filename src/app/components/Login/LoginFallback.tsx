'use client';

import React from 'react';
import { Box, CircularProgress, Typography, Paper, useTheme } from '@mui/material';

export default function LoginFallback() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100dvh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}33, ${theme.palette.background.default})`,
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          minWidth: { xs: '80%', sm: 380 },
        }}
      >
        <CircularProgress color="primary" size={40} thickness={4} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, color: theme.palette.text.secondary }}
        >
          Loading login page…
        </Typography>
      </Paper>
    </Box>
  );
}
