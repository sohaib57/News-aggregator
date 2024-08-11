import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTopHeadlines, clearNews } from "../features/topHeadlinesSlice";
import NewsList from "../components/NewsList/NewsList";
import { Typography, Container, Box } from "@mui/material";
import { CATEGORIES } from "../constants/constants";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { news, paginationStatus, error } = useSelector(
    (state) => state.topHeadlines
  );

  const category =
    CATEGORIES.find((cat) => cat.id === categoryId)?.name || "Unknown Category";

  useEffect(() => {
    dispatch(clearNews());
    dispatch(
      getTopHeadlines({
        query: "",
        category: categoryId,
        page: 1,
        pageSize: 50,
      })
    );
  }, [dispatch, categoryId]);

  return (
    <Container>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h3" component="h1" sx={{ marginTop: 8 }}>
          {category}
        </Typography>
      </Box>
      {paginationStatus === "loading" && (
        <LoadingIndicator status={paginationStatus} error={error} />
      )}
      {paginationStatus === "failed" && (
        <Typography variant="h6" color="error">
          Oops! Something went wrong. Please try again later.
          <br />
          Error Details: {error}
        </Typography>
      )}
      {paginationStatus === "idle" && <NewsList news={news} />}
    </Container>
  );
};

export default CategoryDetailPage;