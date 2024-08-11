import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopHeadlines } from '../api/newsApiClient';

// Thunk for fetching top headlines
export const getTopHeadlines = createAsyncThunk(
  'topHeadlines/getTopHeadlines',
  async ({ query, category, page, pageSize }, { rejectWithValue }) => {
    try {
      const data = await fetchTopHeadlines(query, category, page, pageSize);
      return { articles: data.articles, category, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const topHeadlinesSlice = createSlice({
  name: 'topHeadlines',
  initialState: {
    articles: [],
    filters: {
      query: '',
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
      state.articles = [];
    }
  },
  extraReducers: (builder) => {
    builder
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

export const { setFilters, setPage, setQuery, clearArticles } = topHeadlinesSlice.actions;

export default topHeadlinesSlice.reducer;