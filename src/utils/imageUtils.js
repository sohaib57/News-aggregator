export const getImage = (urlToImage) => {
    const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/800x400?text=No+Image';
    return urlToImage || PLACEHOLDER_IMAGE_URL;
  };
  