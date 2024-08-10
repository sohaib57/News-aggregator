// src/components/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, getTopHeadlines } from '../features/articlesSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchForm from './SearchForm'; // Import the new component

const Header = ({ onDrawerToggle }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const activeCategory = useSelector((state) => state.articles.filters.category);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({
      query: searchQuery,
      dateRange: {},
      source: '',
      category: activeCategory,
    }));
    dispatch(getTopHeadlines({ query: searchQuery, category: activeCategory }));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Innoscripta News
        </Typography>
        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
