import React from "react";
import { Button, TextField, Box } from "@mui/material";

const SearchForm = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <Box
      component="form"
      onSubmit={onSearchSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        maxWidth: 400,
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search news, topics and more"
        value={searchQuery}
        onChange={onSearchChange}
        fullWidth 
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!searchQuery.trim()}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
