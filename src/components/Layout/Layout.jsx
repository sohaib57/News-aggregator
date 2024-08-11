import React, { useState } from "react";
import Header from "../Header";
import SubHeader from "../SubHeader";
import MobileDrawer from "../MobileDrawer";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Small screens and down
  const isTabletOrLarger = useMediaQuery(theme.breakpoints.up('md')); // Medium screens and up

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Box>
      <Header onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <SubHeader hideOnDrawerOpen={drawerOpen} />
      <Box
        sx={{
          marginTop: isMobile ? 2 : isTabletOrLarger ? 4 : 3,  
          marginBottom: isMobile ? 2 : isTabletOrLarger ? 4 : 3,
        }}
      >
        <Outlet /> {/* This will render the nested routes */}
      </Box>
    </Box>
  );
};

export default Layout;
