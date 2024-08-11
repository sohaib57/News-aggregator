import React, { useState } from 'react';
import Header from '../Header';
import SubHeader from '../SubHeader';
import MobileDrawer from '../MobileDrawer';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Box>
      <Header onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <SubHeader hideOnDrawerOpen={drawerOpen} />
      <Outlet /> {/* This will render the nested routes */}
    </Box>
  );
};

export default Layout;
