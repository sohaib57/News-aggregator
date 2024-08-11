import React, { useState, useEffect } from "react";
import useMultiSourceNews from "../hooks/useMultiSourceNews";
import NewsList from "../components/NewsList";
import MobileDrawer from "../components/MobileDrawer";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Media query for mobile view
  const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch data using the current page
  const { news, status, error, totalPages, totalResults } = useMultiSourceNews(
    "latest",
    page,
    "everything"
  );

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    // Reset to the first page when totalPages changes
    setPage(1);
  }, [totalPages]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxButtons = 2; // Number of buttons to show before and after the current page
    const buttons = [];
    const halfMax = Math.floor(maxButtons / 2);

    let startPage = Math.max(page - halfMax, 1);
    let endPage = Math.min(page + halfMax, totalPages);

    if (endPage - startPage + 1 < maxButtons * 2 + 1) {
      if (endPage === totalPages) {
        startPage = Math.max(totalPages - maxButtons * 2, 1);
      } else {
        endPage = Math.min(startPage + maxButtons * 2, totalPages);
      }
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }

    return buttons.map((pageNum, index) =>
      pageNum === "..." ? (
        <Typography key={index} variant="body1" sx={{ mx: 1 }}>
          ...
        </Typography>
      ) : (
        <Button
          key={pageNum}
          variant="outlined"
          onClick={() => handlePageChange(pageNum)}
          sx={{ mx: 0.5 }}
          disabled={pageNum === page}
        >
          {pageNum}
        </Button>
      )
    );
  };

  return (
    <Container>
      <Box sx={{ marginTop: 8 }}>
        <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
        {status === "loading" && (
          <LoadingIndicator status={status} error={error} />
        )}
        {status === "succeeded" && (
          <>
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
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
              {!isMobile && renderPagination()}
              {isMobile && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
        {status === "failed" && (
          <Typography variant="h6" color="error">
            Oops! Something went wrong. {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
