import React from "react";
import useMultiSourceNews from "../hooks/useMultiSourceNews ";
import NewsList from "../components/NewsList";
import LoadingIndicator from "../components/LoadingIndicator";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  // Using Guardian API for search results
  const { news, status, error } = useMultiSourceNews(
    searchQuery,
    true,
    "guardian"
  );
  console.log("news", news);

  return (
    <Container>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h5" component="h1">
          Search Results for "{searchQuery}"
        </Typography>
      </Box>
      <LoadingIndicator status={status} error={error} />
      {status === "succeeded" && <NewsList news={news} />}
    </Container>
  );
};

export default SearchPage;
