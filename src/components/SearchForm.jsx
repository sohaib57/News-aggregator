// src/components/SearchForm.js
import React from 'react';
import { Button, TextField } from '@mui/material';

const SearchForm = ({ searchQuery, onSearchChange, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search"
      value={searchQuery}
      onChange={onSearchChange}
      sx={{ marginRight: 2 }}
    />
    <Button type="submit" variant="contained" color="primary">
      Search
    </Button>
  </form>
);

export default SearchForm;
