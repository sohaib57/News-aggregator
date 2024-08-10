import { createSlice } from '@reduxjs/toolkit';

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    sources: [],
    categories: [],
    authors: [],
  },
  reducers: {
    setSources: (state, action) => {
      state.sources = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAuthors: (state, action) => {
      state.authors = action.payload;
    },
  },
});

export const { setSources, setCategories, setAuthors } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
