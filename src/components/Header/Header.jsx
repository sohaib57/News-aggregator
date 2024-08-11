import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchForm from '../SearchForm/SearchForm';
import { setFilters } from '../../features/newsSlice'; 

const Header = ({ onDrawerToggle, drawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ query: searchQuery }));
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && <IconButton edge="start" color="inherit" aria-label="menu" onClick={onDrawerToggle}><MenuIcon /></IconButton>}
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            Innoscripta News
          </Typography>
        </Box>
        {!drawerOpen && !isMobile && <SearchForm searchQuery={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} onSearchSubmit={handleSearchSubmit} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
