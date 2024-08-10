// src/hooks/useArticles.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../features/articlesSlice';

const useArticles = (query) => {
  const dispatch = useDispatch();
  const { articles, status, error, filters } = useSelector((state) => state.articles);

  const [page, setPage] = useState(filters.page);

  useEffect(() => {
    // Dispatch initial fetch if necessary
    if (filters.page === 1) {
      dispatch(getArticles({ query, filters }));
    }
  }, [dispatch, query, filters]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    dispatch(getArticles({ query, filters: { ...filters, page: newPage } }));
  };

  return { articles, status, error, loadMore };
};

export default useArticles;
