import React from 'react';
import { AppBar, Toolbar, Button, useTheme, useMediaQuery, Box } from '@mui/material';
import { CATEGORIES } from '../constants/constants';
import { useNavigate } from 'react-router-dom';

const SubHeader = ({ hideOnDrawerOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryClick = (categoryId) => {
    navigate(`/${categoryId}`);
  };

  return (
    <AppBar position="static" color="default" sx={{ display: hideOnDrawerOpen ? 'none' : 'block' }}>
      <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
        {/* Use Box to handle overflow and scrolling */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            overflowX: 'auto', // Enable horizontal scrolling
            width: '100%', 
            justifyContent: isMobile ? 'center' : 'flex-start' // Center or align items based on screen size
          }}
        >
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              sx={{ 
                margin: 1, 
                minWidth: '120px', // Ensure buttons have a minimum width
                textAlign: 'center' // Center text inside buttons
              }}
            >
              {cat.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SubHeader;