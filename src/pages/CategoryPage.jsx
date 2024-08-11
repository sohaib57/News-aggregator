import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTopHeadlines, clearArticles } from "../features/topHeadlinesSlice";
import ArticleList from "../components/ArticleList";
import { CircularProgress, Typography, Container, Box } from "@mui/material";
import { CATEGORIES } from "../constants/constants";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { articles, paginationStatus } = useSelector(
    (state) => state.topHeadlines
  );

  // Find the category name based on the categoryId
  const category =
    CATEGORIES.find((cat) => cat.id === categoryId)?.name || "Unknown Category";

  useEffect(() => {
    // Clear existing articles for the new category
    dispatch(clearArticles());

    // Fetch articles for the selected category
    dispatch(
      getTopHeadlines({
        query: "", // Empty query for category page
        category: categoryId,
        page: 1,
        pageSize: 50, // Adjust based on your requirement
      })
    );
  }, [dispatch, categoryId]);

  return (
    <Container>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h3" component="h1">
          {category}
        </Typography>
      </Box>
      {paginationStatus === "loading" && <CircularProgress />}
      {paginationStatus === "failed" && (
        <Typography variant="h6" color="error">
          Oops! Something went wrong. Please try again later.
        </Typography>
      )}
      {paginationStatus === "idle" && <ArticleList articles={articles} />}
    </Container>
  );
};

export default CategoryPage;
