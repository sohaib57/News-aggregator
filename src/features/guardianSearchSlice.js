import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsFromGuardian } from "../api/newsApiClient";
import { handleApiError } from "../utils/errorHandler";

// Thunk for fetching articles from Guardian API
export const searchGuardianNews = createAsyncThunk(
  "guardianSearch/searchGuardianNews",
  async (query, { rejectWithValue }) => {
    try {
      const data = await fetchNewsFromGuardian(query);
      return data.response.results; // Ensure this matches the API response structure
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
        state.news = action.payload; // Ensure this is the correct state key
      })
      .addCase(searchGuardianNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default guardianSearchSlice.reducer;
