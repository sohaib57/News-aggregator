import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../features/articlesSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchForm from "./SearchForm";

const Header = ({ onDrawerToggle, drawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = React.useState("");

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
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: isMobile ? "center" : "flex-start", // Adjust alignment based on screen size
          }}
        >
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
            }}
            onClick={handleLogoClick} // Click handler for navigation
          >
            Innoscripta News
          </Typography>
        </Box>
        {!drawerOpen && !isMobile && (
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
