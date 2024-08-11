import axios from 'axios';
import { NEWS_API_KEY, NEWS_API_KEY_BASE_URL, GUARDIAN_NEWS_API_KEY, GUARDIAN_NEWS_BASE_URL } from '../config';

// Function to fetch data from an API
const fetchData = async (baseUrl, apiKey, endpoint, params) => {
  try {
    const apiKeyParam = baseUrl.includes('guardian') ? 'api-key' : 'apiKey';
    const response = await axios.get(`${baseUrl}/${endpoint}`, {
      params: { ...params, [apiKeyParam]: apiKey },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

// API service functions
export const fetchNews = async (query, filters) => fetchData(NEWS_API_KEY_BASE_URL, NEWS_API_KEY, 'everything', { q: query, ...filters });
export const fetchTopHeadlines = async (query, category, page = 1, pageSize = 50) => fetchData(NEWS_API_KEY_BASE_URL, NEWS_API_KEY, 'top-headlines', { q: query, category, page, pageSize });
export const fetchSources = async () => fetchData(NEWS_API_KEY_BASE_URL, NEWS_API_KEY, 'sources', {});
export const fetchNewsFromGuardian = async (query, filters) => {
  const { page = 1, pageSize = 10, ...rest } = filters;
  return fetchData(GUARDIAN_NEWS_BASE_URL, GUARDIAN_NEWS_API_KEY, 'search', { q: query, page, pageSize, ...rest });
};
