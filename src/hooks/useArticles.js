import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, clearArticles } from '../features/articlesSlice'; // Import clearArticles action

const useArticles = (query, isSearch = false) => { // Added isSearch flag
  const dispatch = useDispatch();
  const { articles, status, error, filters } = useSelector((state) => state.articles);

  useEffect(() => {
    if (isSearch) {
      dispatch(clearArticles()); // Clear articles when performing a search
    }
    dispatch(getArticles({ query, filters, isSearch }));
  }, [dispatch, query, filters, isSearch]);

  return { articles, status, error };
};

export default useArticles;
