// features/guardianSearchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesFromGuardian } from '../api/newsApiClient';

// Thunk for fetching articles from Guardian API
export const searchGuardianArticles = createAsyncThunk(
  'guardianSearch/searchGuardianArticles',
  async (query, { rejectWithValue }) => {
    try {
      const data = await fetchArticlesFromGuardian(query);
      return data.response.results; // Adjust this based on actual response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const guardianSearchSlice = createSlice({
  name: 'guardianSearch',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGuardianArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchGuardianArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(searchGuardianArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default guardianSearchSlice.reducer;
