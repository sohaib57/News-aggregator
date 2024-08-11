import React from "react";
import NewsCard from "./NewsCard"; // Update import to NewsCard
import { Box, Typography } from "@mui/material";

const NewsList = ({ news }) => { // Update prop name to news
  if (!news) {
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
      {news.length === 0 ? ( // Update to use news
        <Typography variant="body1">No results found</Typography>
      ) : (
        news.map((item) => ( // Rename article to item
          <NewsCard
            key={item.id || item.url} // Ensure unique key
            news={{
              title: item.webTitle || item.title,
              description: item.pillarName || item.description,
              url: item.webUrl || item.url,
              image: item.urlToImage || "", 
              publishedAt: item.webPublicationDate || item.publishedAt,
              source: { name: item.sectionName || item.source?.name }, 
            }}
          />
        ))
      )}
    </Box>
  );
};

export default NewsList;
