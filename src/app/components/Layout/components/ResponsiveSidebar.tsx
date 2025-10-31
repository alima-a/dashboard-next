'use client';

import * as React from 'react';
import { Drawer } from '@mui/material';
import SideNav from './SideNav';
import { drawerWidth } from '@/src/app/components/Layout/Layout';

/**
 * Renders two drawers:
 * - Temporary drawer for mobile
 * - Permanent drawer for desktop
 */
export default function ResponsiveSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }} // better perf on mobile
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <SideNav onNavigate={onClose} />
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <SideNav />
      </Drawer>
    </>
  );
}
