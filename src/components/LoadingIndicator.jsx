// src/components/LoadingIndicator.js
import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const LoadingIndicator = ({ status, error }) => {
  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography variant="h6" color="error">Oops! Something went wrong. {error}</Typography>;
  return null;
};

export default LoadingIndicator;
