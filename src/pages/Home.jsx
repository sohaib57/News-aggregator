import React from "react";
import useArticles from "../hooks/useArticles";
import ArticleList from "../components/ArticleList";
import MobileDrawer from "../components/MobileDrawer";
import LoadingIndicator from "../components/LoadingIndicator";
import { Box } from "@mui/material";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { articles, status, error } = useArticles("latest");

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <Box>
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <LoadingIndicator status={status} error={error} />
      {status === "succeeded" && <ArticleList articles={articles} />}
    </Box>
  );
};

export default Home;
