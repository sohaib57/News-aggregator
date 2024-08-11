import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../api/newsServiceImpl';

// Thunk for fetching news
export const getNews = createAsyncThunk(
  'news/getNews',
  async ({ query, filters }, { rejectWithValue }) => {
    try {
      const data = await fetchNews(query, filters);
      return data.articles; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
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
    clearNews(state) {
      state.news = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload; // State update
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setQuery, clearNews } = newsSlice.actions;

export default newsSlice.reducer;
