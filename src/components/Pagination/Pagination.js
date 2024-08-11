import React from 'react';
import { Box, Button, Typography, Stack, useMediaQuery } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxButtons = 2;
    const buttons = [];
    const halfMax = Math.floor(maxButtons / 2);

    let startPage = Math.max(currentPage - halfMax, 1);
    let endPage = Math.min(currentPage + halfMax, totalPages);

    if (endPage - startPage + 1 < maxButtons * 2 + 1) {
      if (endPage === totalPages) {
        startPage = Math.max(totalPages - maxButtons * 2, 1);
      } else {
        endPage = Math.min(startPage + maxButtons * 2, totalPages);
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
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
      {isMobile ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Typography variant="body2" sx={{ mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      ) : (
        <>
          <Button
            variant="outlined"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          {renderPagination()}
          <Button
            variant="outlined"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Pagination;
