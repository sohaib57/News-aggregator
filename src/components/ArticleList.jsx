// src/components/ArticleList.js
import React from "react";
import ArticleCard from "./ArticleCard";
import { Box, Typography } from "@mui/material";

const ArticleList = ({ articles }) => {
  if (!articles) {
    return <Typography variant="body1">No results found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      {articles.length === 0 ? (
        <Typography variant="body1">No results found</Typography>
      ) : (
        articles.map((article) => (
          <ArticleCard
            key={article.id || article.url} // Ensure unique key
            article={{
              title: article.webTitle || article.title,
              description: article.pillarName || article.description, // Adjust as necessary
              url: article.webUrl || article.url,
              image: article.urlToImage || "", // Adapt as necessary
              publishedAt: article.webPublicationDate || article.publishedAt,
              source: { name: article.sectionName || article.source?.name }, // Adapt as necessary
            }}
          />
        ))
      )}
    </Box>
  );
};

export default ArticleList;
