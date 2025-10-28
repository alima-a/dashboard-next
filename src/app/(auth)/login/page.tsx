'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min 6 chars'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(data) });
        if (res.ok) location.assign('/dashboard'); else alert('Invalid credentials');
    };

    return (
        <Box sx={{ maxWidth: 360, m: '80px auto' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" fullWidth sx={{ mb: 2 }} {...register('email')}
                           error={!!errors.email} helperText={errors.email?.message}/>
                <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} {...register('password')}
                           error={!!errors.password} helperText={errors.password?.message}/>
                <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>Log in</Button>
            </form>
        </Box>
    );
}
