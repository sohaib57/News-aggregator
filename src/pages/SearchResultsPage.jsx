import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList/NewsList';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import Pagination from '../components/Pagination/Pagination'; 
import { fetchNewsFromGuardian } from '../api/newsServiceImpl';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const currentPage = parseInt(queryParams.get('page'), 10) || 1;

  const [news, setNews] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      setStatus('loading');
      try {
        const data = await fetchNewsFromGuardian(searchQuery, { page: currentPage });
        setNews(data.response.results);
        setTotalPages(Math.ceil(data.response.total / 10));
        setTotalResults(data.response.total);
        setStatus('succeeded');
      } catch (error) {
        setError(error.message);
        setStatus('failed');
      }
    };

    fetchNews();
  }, [searchQuery, currentPage]);

  const handlePageChange = (newPage) => {
    navigate(`?query=${searchQuery}&page=${newPage}`);
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h5" component="h1" sx={{ marginTop: 8 }}>
          Search Results for "{searchQuery}"
        </Typography>
      </Box>
      {status === 'loading' && (
        <LoadingIndicator status={status} error={error} />
      )}
      {status === 'succeeded' && (
        <>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Typography variant="body1">
              Showing page {currentPage} of {totalPages} ({totalResults} results)
            </Typography>
          </Box>
          <NewsList news={news} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {status === 'failed' && (
        <Typography variant="h6" color="error">
          Oops! Something went wrong. {error}
        </Typography>
      )}
    </Container>
  );
};

export default SearchResultsPage;
