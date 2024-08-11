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
        gap: 1, // Space between the text field and button
        maxWidth: 400, // Optional: to limit the width of the form
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search news, topics and more"
        value={searchQuery}
        onChange={onSearchChange}
        fullWidth // Ensures the text field takes available width
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!searchQuery.trim()} // Disable if the input field is empty
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
