import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../api/newsApiClient';

// Thunk for fetching articles
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
      .addCase(getArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload; // Replace articles with new data
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setQuery, clearArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
