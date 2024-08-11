// hooks/useMultiSourceNews.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNews } from '../features/newsSlice'; // For Everything API
import { getTopHeadlines } from '../features/topHeadlinesSlice'; // For Top Headlines API

const useMultiSourceNews = (query, page, apiSource = 'everything') => {
  const dispatch = useDispatch();

  const selectArticlesState = (state) => {
    switch (apiSource) {
      case 'everything':
        return state.news;
      case 'topHeadlines':
        return state.topHeadlines;
      default:
        return state.news;
    }
  };

  const { news, status, error, totalPages, totalResults } = useSelector(selectArticlesState);

  useEffect(() => {
    if (apiSource === 'topHeadlines') {
      dispatch(getTopHeadlines({ query, page }));
    } else {
      dispatch(getNews({ query, filters: { page, pageSize: 10 } }));
    }
  }, [dispatch, query, apiSource, page]);

  return { news, status, error, totalPages, totalResults };
};

export default useMultiSourceNews;
