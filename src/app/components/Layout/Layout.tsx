'use client';

import * as React from 'react';
import { Toolbar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AppHeader from '@/src/app/components/Layout/components/AppHeader';
import ResponsiveSidebar from '@/src/app/components/Layout/components/ResponsiveSidebar';

export const drawerWidth = 240;

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Home', href: '/home', icon: <HomeFilledIcon /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader onMenuClick={() => setMobileOpen(true)} />

      <ResponsiveSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* offset for fixed AppBar */}
        <Toolbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
