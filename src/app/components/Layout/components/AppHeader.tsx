'use client';

import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/** Simple top app bar with a burger on mobile */
export default function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Burger only visible on mobile via parent Drawer display */}
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap>
          Alima Market
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
