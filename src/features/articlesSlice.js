// src/features/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles, fetchTopHeadlines } from '../api/newsApiClient';

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async ({ query, filters }, { rejectWithValue }) => {
    try {
      const data = await fetchArticles(query, filters);
      return data.articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTopHeadlines = createAsyncThunk(
  'articles/getTopHeadlines',
  async ({ query, category, page, pageSize }, { rejectWithValue }) => {
    try {
      const data = await fetchTopHeadlines(query, category, page, pageSize);
      return { articles: data.articles, category, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    filters: {
      query: '',
      dateRange: { startDate: '', endDate: '' },
      source: '',
      category: '',
      page: 1,
      pageSize: 10,
    },
    status: 'idle',
    paginationStatus: 'idle',
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setPage(state, action) {
      state.filters.page = action.payload;
    },
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
    clearArticles(state) {
      state.articles = []; // Clear the articles
      state.filters.page = 1; // Reset page to 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = [...state.articles, ...action.payload];
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getTopHeadlines.pending, (state) => {
        state.paginationStatus = 'loading';
      })
      .addCase(getTopHeadlines.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.articles = action.payload.articles; // Replace articles if it's the first page
        } else {
          state.articles = [...state.articles, ...action.payload.articles]; // Append articles for subsequent pages
        }
        state.filters.category = action.payload.category; // Update the category in the filters
        state.filters.page = action.payload.page; // Update the current page
        state.paginationStatus = 'idle';
      })
      .addCase(getTopHeadlines.rejected, (state, action) => {
        state.paginationStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setQuery, clearArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
