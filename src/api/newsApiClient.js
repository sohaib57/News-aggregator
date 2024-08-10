// src/api/newsApiClient.js
import axios from "axios";
import { API_KEY, BASE_URL } from "../config";

const fetchData = async (endpoint, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        ...params,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const fetchArticles = (query, filters) =>
  fetchData("everything", {
    q: query,
    from: filters.dateRange.startDate,
    to: filters.dateRange.endDate,
    sources: filters.source,
    category: filters.category,
    page: filters.page,
    pageSize: filters.pageSize,
  });

export const fetchTopHeadlines = (query, category, page = 1, pageSize = 50) =>
  fetchData("top-headlines", {
    q: query,
    category: category,
    page,
    pageSize,
  });

export const fetchSources = () => fetchData("top-headlines/sources", {});
