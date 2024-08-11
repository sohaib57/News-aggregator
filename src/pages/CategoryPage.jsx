import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTopHeadlines, clearArticles } from '../features/topHeadlinesSlice';
import ArticleList from '../components/ArticleList';
import { CircularProgress, Typography, Container, Box } from '@mui/material';
import { CATEGORIES } from '../constants/constants';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { articles, paginationStatus, error } = useSelector((state) => state.topHeadlines);

  // Find the category name based on the categoryId
  const category = CATEGORIES.find((cat) => cat.id === categoryId)?.name || 'Unknown Category';

  useEffect(() => {
    dispatch(clearArticles());
    dispatch(
      getTopHeadlines({
        query: '', // Empty query for category page
        category: categoryId,
        page: 1,
        pageSize: 50,
      })
    );
  }, [dispatch, categoryId]);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" component="h1">
          {category}
        </Typography>
      </Box>
      {paginationStatus === 'loading' && <CircularProgress />}
      {paginationStatus === 'failed' && (
        <Typography variant="h6" color="error">
          Oops! Something went wrong. Please try again later.
          <br />
          Error Details: {error}
        </Typography>
      )}
      {paginationStatus === 'idle' && <ArticleList articles={articles} />}
    </Container>
  );
};

export default CategoryPage;
