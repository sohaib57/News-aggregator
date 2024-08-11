import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsFromGuardian } from "../api/newsServiceImpl";
import { handleApiError } from "../utils/errorHandler";

// Thunk for fetching articles from Guardian API with pagination
export const searchGuardianNews = createAsyncThunk(
  "guardianSearch/searchGuardianNews",
  async ({ query, page = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const data = await fetchNewsFromGuardian(query, { page, pageSize });
      return {
        results: data.response.results,
        totalPages: data.response.pages
      };
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
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGuardianNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchGuardianNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(searchGuardianNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPage, setTotalPages } = guardianSearchSlice.actions;
export default guardianSearchSlice.reducer;



