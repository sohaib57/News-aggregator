import React, { useState, useEffect } from "react";
import useMultiSourceNews from "../hooks/useMultiSourceNews";
import NewsList from "../components/NewsList/NewsList";
import MobileDrawer from "../components/Drawer/MobileDrawer";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import Pagination from "../components/Pagination/Pagination"; 
import { Box, Container, Typography } from "@mui/material";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

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
    if (totalPages < page) {
      setPage(totalPages);
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

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
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
