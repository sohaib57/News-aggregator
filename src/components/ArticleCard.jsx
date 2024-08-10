// src/components/ArticleCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Link } from '@mui/material';
import { PLACEHOLDER_IMAGE_URL } from '../constants/constants';

const ArticleCard = ({ article }) => {
  const imageSrc = article.urlToImage || PLACEHOLDER_IMAGE_URL;

  return (
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'row', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <CardMedia
        component="img"
        image={imageSrc}
        alt={article.title || 'Article image'}
        style={{ width: '200px', height: '150px', objectFit: 'cover' }}
      />
      <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <Typography variant="h6" component="div" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {article.title || 'No title available'}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ flex: 1 }}>
          {article.description || 'No description available'}
        </Typography>
        <Link href={article.url} target="_blank" rel="noopener" style={{ marginTop: 'auto', textDecoration: 'none', color: '#1e88e5' }}>
          Read more
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
