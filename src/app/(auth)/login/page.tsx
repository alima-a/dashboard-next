'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 chars'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.ok) location.assign('/dashboard');
    else alert('Invalid credentials');
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
        sx={{
          width: '100%',
          maxWidth: 400,
          p: isMobile ? 3 : 4,
          boxShadow: isMobile ? 'none' : undefined,
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{ mb: 2 }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{ mb: 3 }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            size={isMobile ? 'medium' : 'large'}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            sx={{
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
