import React from 'react';
import { Card, CardContent, Typography, CardMedia, Link } from '@mui/material';
import { getImage } from '../utils/imageUtils';

const NewsCard = ({ news }) => {
  const imageSrc = getImage(news.image);

  return (
    <Card
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt={news.title || 'News image'}
        style={{ width: '200px', height: '150px', objectFit: 'cover' }}
      />
      <CardContent
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          style={{ fontWeight: 'bold', marginBottom: '10px' }}
        >
          {news.title || 'No title available'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: '10px' }}
        >
          {news.description || 'No description available'}
        </Typography>
        {news.source && (
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: '10px' }}
          >
            <strong>Source:</strong> {news.source.name}
          </Typography>
        )}
        {news.publishedAt && (
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: '10px' }}
          >
            <strong>Published At:</strong>{' '}
            {new Date(news.publishedAt).toLocaleDateString()}
          </Typography>
        )}
        <Link
          href={news.url}
          target="_blank"
          rel="noopener"
          style={{
            marginTop: 'auto',
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