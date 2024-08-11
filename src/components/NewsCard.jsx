import React from 'react';
import { Card, CardContent, Typography, CardMedia, Link } from '@mui/material';
import { getImage } from '../utils/imageUtils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const NewsCard = ({ news }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is medium or smaller
  const imageSrc = getImage(news.image);

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt={news.title || 'News image'}
        sx={{
          width: isMobile ? '100%' : '200px',
          height: isMobile ? '200px' : 'none', 
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {news.title || 'No title available'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {news.description || 'No description available'}
        </Typography>
        {news.source && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            <strong>Source:</strong> {news.source.name}
          </Typography>
        )}
        {news.publishedAt && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            <strong>Published At:</strong>{' '}
            {new Date(news.publishedAt).toLocaleDateString()}
          </Typography>
        )}
        <Link
          href={news.url}
          target="_blank"
          rel="noopener"
          sx={{
            mt: 'auto',
            textDecoration: 'none',
            color: '#1e88e5',
          }}
        >
          Read more
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;