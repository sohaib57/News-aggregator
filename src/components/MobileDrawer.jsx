import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CATEGORIES } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, getTopHeadlines } from "../features/topHeadlinesSlice";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";

const MobileDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Responsive check

  const handleCategoryClick = (categoryId) => {
    navigate(`/${categoryId}`); // Navigate to the category page
    onClose(); // Close the drawer after selection
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setFilters({
        query: searchQuery,
        dateRange: {},
        source: "",
        category: "",
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
      sx={{ width: isMobile ? "100%" : 250, height: "100%" }} // Ensure full height and adjust width
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: theme.spacing(2),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Search Form */}
          <Box
            sx={{
              padding: theme.spacing(2),
              flexGrow: 0,
            }}
          >
            <SearchForm
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              vertical
            />
          </Box>
        </Box>

        {/* Categories List */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: theme.spacing(2),
          }}
        >
          <List>
            {CATEGORIES.map((cat) => (
              <ListItem
                button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              >
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
