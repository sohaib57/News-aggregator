import axios from 'axios';
import {
  NEWS_API_KEY,
  NEWS_API_KEY_BASE_URL,
  GUARDIAN_NEWS_API_KEY,
  GUARDIAN_NEWS_BASE_URL,
} from '../config';

// Generic function to fetch data
const fetchData = async (baseUrl, apiKey, endpoint, params) => {
  try {
    const apiKeyParam = baseUrl === GUARDIAN_NEWS_BASE_URL ? 'api-key' : 'apiKey';
    const response = await axios.get(`${baseUrl}/${endpoint}`, {
      params: {
        ...params,
        [apiKeyParam]: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// Fetch news from Everything API
export const fetchNews = (query, filters) =>
  fetchData(NEWS_API_KEY_BASE_URL, NEWS_API_KEY, "everything", {
    q: query,
    from: filters.dateRange?.startDate,
    to: filters.dateRange?.endDate,
    sources: filters.source,
    category: filters.category,
    page: filters.page,
    pageSize: filters.pageSize,
  });

// Fetch top headlines from Everything API
export const fetchTopHeadlines = (query, category, page = 1, pageSize = 50) =>
  fetchData(NEWS_API_KEY_BASE_URL, NEWS_API_KEY, "top-headlines", {
    q: query,
    category: category,
    page,
    pageSize,
  });

// Fetch sources from Everything API
export const fetchSources = () =>
  fetchData(NEWS_API_KEY_BASE_URL, NEWS_API_KEY, "sources", {});

// Fetch news from Guardian API
export const fetchNewsFromGuardian = (query, filters) =>
  fetchData(GUARDIAN_NEWS_BASE_URL, GUARDIAN_NEWS_API_KEY, "search", {
    q: query,
    // fromDate: filters?.dateRange?.startDate,
    // toDate: filters?.dateRange?.endDate,
    // section: filters?.category,
    // pageSize: filters?.pageSize,
  });
