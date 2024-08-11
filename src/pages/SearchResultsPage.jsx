import React from 'react';
import NewsList from '../components/NewsList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import useMultiSourceNews from '../hooks/useMultiSourceNews'; // Import the custom hook

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const currentPage = parseInt(queryParams.get('page')) || 1;

  const { news, status, error, page, totalPages, totalResults } = useMultiSourceNews(searchQuery, currentPage, 'guardian');

  const handlePageChange = (newPage) => {
    navigate(`?query=${searchQuery}&page=${newPage}`);
  };

  const renderPagination = () => {
    const maxButtons = 2; // Number of buttons to show on either side of the current page
    const buttons = [];
    const halfMax = Math.floor(maxButtons / 2);

    let startPage = Math.max(page - halfMax, 1);
    let endPage = Math.min(page + halfMax, totalPages);

    // Adjust start and end page if not enough buttons on one side
    if (endPage - startPage + 1 < maxButtons) {
      if (endPage === totalPages) {
        startPage = Math.max(totalPages - maxButtons + 1, 1);
      } else {
        endPage = Math.min(startPage + maxButtons - 1, totalPages);
      }
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push('...');
      buttons.push(totalPages);
    }

    return buttons.map((pageNum, index) =>
      pageNum === '...' ? (
        <Typography key={index} variant="body1" sx={{ mx: 1 }}>
          ...
        </Typography>
      ) : (
        <Button
          key={pageNum}
          variant="outlined"
          onClick={() => handlePageChange(pageNum)}
          sx={{ mx: 0.5 }}
          disabled={pageNum === currentPage}
        >
          {pageNum}
        </Button>
      )
    );
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
              Showing page {page} of {totalPages} ({totalResults} results)
            </Typography>
          </Box>
          <NewsList news={news} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            {!isMobile && (
              <>
                <Button
                  variant="outlined"
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                {renderPagination()}
                <Button
                  variant="outlined"
                  disabled={page >= totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </>
            )}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                <Typography variant="body2" sx={{ mx: 2 }}>
                  Page {page} of {totalPages}
                </Typography>
                <Button
                  variant="outlined"
                  disabled={page >= totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default SearchResultsPage;