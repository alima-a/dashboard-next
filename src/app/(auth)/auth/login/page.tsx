'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

type FormData = { email: string; password: string };

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const from = params.get('from') || '/home';
      router.replace(from);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        px: 2,
      }}
    >
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{ width: '100%', maxWidth: 400, p: isMobile ? 3 : 4, borderRadius: 2 }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{ mb: 2 }}
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{ mb: 3 }}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min 6 chars' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            size={isMobile ? 'medium' : 'large'}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            sx={{ py: 1.2, fontWeight: 600, textTransform: 'none', borderRadius: 2 }}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
