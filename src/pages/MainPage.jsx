import React from "react";
import useMultiSourceNews from "../hooks/useMultiSourceNews";
import NewsList from "../components/NewsList";
import MobileDrawer from "../components/MobileDrawer";
import LoadingIndicator from "../components/LoadingIndicator";
import { Box, Container } from "@mui/material";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { news, status, error } = useMultiSourceNews(
    "latest",
    false,
    "everything"
  );

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <Container>
      <Box>
        <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle} />
        {status === "loading" && (
           <LoadingIndicator status={status} error={error} />
        )}
        {status === "succeeded" && <NewsList news={news} />}
      </Box>
    </Container>
  );
};

export default Home;
