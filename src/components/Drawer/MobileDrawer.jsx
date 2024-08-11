import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import { CATEGORIES } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../features/newsSlice'; 
import { useNavigate } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';

const MobileDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryClick = (categoryId) => {
    navigate(`/${categoryId}`);
    onClose();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setFilters({
        query: searchQuery
      })
    );
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{ width: isMobile ? '100%' : 250, height: '100%' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ padding: theme.spacing(2), borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ padding: theme.spacing(2), flexGrow: 0 }}>
            <SearchForm
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              vertical
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: theme.spacing(2) }}>
          <List>
            {CATEGORIES.map((cat) => (
              <ListItem button key={cat.id} onClick={() => handleCategoryClick(cat.id)}>
                <ListItemText primary={cat.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;