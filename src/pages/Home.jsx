// src/pages/Home.jsx
import React from "react";
import useArticles from "../hooks/useArticles";
import ArticleList from "../components/ArticleList";
import MobileDrawer from "../components/MobileDrawer";
import LoadingIndicator from "../components/LoadingIndicator";
import { Container, Button } from "@mui/material";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { articles, status, error, loadMore } = useArticles("latest");

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <Container maxWidth="lg">
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <LoadingIndicator status={status} error={error} />
      {status === "succeeded" && <ArticleList articles={articles} />}
      {status === "succeeded" && (
        <Button
          variant="contained"
          color="primary"
          onClick={loadMore}
          style={{ marginTop: 20 }}
        >
          Load More
        </Button>
      )}
    </Container>
  );
};

export default Home;
