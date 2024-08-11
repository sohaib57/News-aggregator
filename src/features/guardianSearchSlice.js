import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsFromGuardian } from "../api/newsServiceImpl";
import { handleApiError } from "../utils/errorHandler";

// Thunk for fetching articles from Guardian API
export const searchGuardianNews = createAsyncThunk(
  "guardianSearch/searchGuardianNews",
  async (query, { rejectWithValue }) => {
    try {
      const data = await fetchNewsFromGuardian(query);
      return data.response.results;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const guardianSearchSlice = createSlice({
  name: "guardianSearch",
  initialState: {
    news: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGuardianNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchGuardianNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(searchGuardianNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default guardianSearchSlice.reducer;
