// src/components/MobileDrawer.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { CATEGORIES } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, getTopHeadlines } from '../features/articlesSlice';

const MobileDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.articles.filters.category);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleCategoryClick = (category) => {
    dispatch(setFilters({ query: searchQuery, dateRange: {}, source: '', category }));
    dispatch(getTopHeadlines({ query: searchQuery, category }));
    onClose(); // Close the drawer after selection
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ query: searchQuery, dateRange: {}, source: '', category: activeCategory }));
    dispatch(getTopHeadlines({ query: searchQuery, category: activeCategory }));
    onClose(); // Close the drawer after search
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ width: 250, padding: 20 }}>
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: 20 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </form>
        <List>
          {CATEGORIES.map((cat) => (
            <ListItem button key={cat.id} onClick={() => handleCategoryClick(cat.id)}>
              <ListItemText primary={cat.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default MobileDrawer;