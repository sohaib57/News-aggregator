import React from "react";
import { useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";
import { Box, Typography } from "@mui/material";

const ArticleList = ({ articles }) => {
  const { status } = useSelector((state) => state.articles);

  if (status === "loading") return <Typography variant="body1">Loading...</Typography>;
  if (status === "failed") return <Typography variant="body1" color="error">Error loading articles</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2, 
        p: 2
      }}
    >
      {articles.length === 0 ? (
        <Typography variant="body1">No results found</Typography>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))
      )}
    </Box>
  );
};

export default ArticleList;
