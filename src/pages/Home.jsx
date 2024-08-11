import React from "react";
import useMultiSourceNews from "../hooks/useMultiSourceNews ";
import NewsList from "../components/NewsList";
import MobileDrawer from "../components/MobileDrawer";
import LoadingIndicator from "../components/LoadingIndicator";
import { Box } from "@mui/material";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Using Everything API for latest articles
  const { news, status, error } = useMultiSourceNews(
    "latest",
    false,
    "everything"
  );

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <Box>
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <LoadingIndicator status={status} error={error} />
      {status === "succeeded" && <NewsList news={news} />}
    </Box>
  );
};

export default Home;
