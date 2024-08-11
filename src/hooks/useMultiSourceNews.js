// hooks/useMultiSourceNews.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { searchGuardianNews } from '../features/guardianSearchSlice'; // For Guardian API
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
      case 'guardian':
        return state.guardianSearch;
      default:
        return state.news;
    }
  };

  const { news, status, error, totalPages, totalResults } = useSelector(selectArticlesState);

  useEffect(() => {
    if (apiSource === 'guardian') {
      dispatch(searchGuardianNews({ query, page }));
    } else if (apiSource === 'topHeadlines') {
      dispatch(getTopHeadlines({ query, page }));
    } else {
      dispatch(getNews({ query, page }));
    }
  }, [dispatch, query, apiSource, page]);

  return { news, status, error, page, totalPages, totalResults };
};

export default useMultiSourceNews;