import React from 'react';
import useArticles from '../hooks/useArticles';
import ArticleList from '../components/ArticleList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  const { articles, status, error } = useArticles(searchQuery, true); // true for search

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h5" component="h1">
          Search Results for "{searchQuery}"
        </Typography>
      </Box>
      <LoadingIndicator status={status} error={error} />
      {status === 'succeeded' && <ArticleList articles={articles} />}
    </Container>
  );
};

export default SearchPage;
