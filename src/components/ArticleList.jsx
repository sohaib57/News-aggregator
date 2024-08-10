import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';

const ArticleList = () => {
  const { articles, status } = useSelector((state) => state.articles);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading articles</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))
      )}
    </div>
  );
};

export default ArticleList;
