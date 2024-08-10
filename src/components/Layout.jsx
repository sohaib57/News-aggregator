// src/components/Layout.jsx
import React, { useState } from 'react';
import Header from './Header';
import SubHeader from './SubHeader';
import MobileDrawer from './MobileDrawer';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Container>
      <Header onDrawerToggle={handleDrawerToggle} />
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <SubHeader />
      <Outlet /> {/* This will render the nested routes */}
    </Container>
  );
};

export default Layout;
