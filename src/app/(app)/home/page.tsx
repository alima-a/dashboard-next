'use client';

import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        mt: isMobile ? 6 :20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography
        variant={isMobile ? 'h6' : 'h4'}
        sx={{
          fontWeight: 700,
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Welcome!
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 600 }}>
        Welcome to my test project. I hope you enjoy exploring it as much as I enjoyed building it.
        Have a great time reviewing!
      </Typography>

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => router.push('/dashboard')}
        sx={{ borderRadius: 2, textTransform: 'none', px: 4 }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}
