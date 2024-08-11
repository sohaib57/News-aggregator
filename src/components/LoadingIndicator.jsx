import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const LoadingIndicator = ({ status, error }) => {
  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh", 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Oops! Something went wrong. {error}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default LoadingIndicator;
