import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTopHeadlines, clearArticles } from '../features/articlesSlice';
import ArticleList from '../components/ArticleList';
import { CircularProgress } from '@mui/material';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    // Clear existing articles for the new category
    dispatch(clearArticles());

    // Fetch articles for the selected category
    dispatch(getTopHeadlines({
      query: '', // Empty query for category page
      category: categoryId,
      page: 1,
      pageSize: 50, // Adjust based on your requirement
    }));
  }, [dispatch, categoryId]);

  return (
    <div>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <p>Oops! Something went wrong. Please try again later.</p>}
      {status === 'succeeded' && <ArticleList articles={articles} />}
    </div>
  );
};

export default CategoryPage;
