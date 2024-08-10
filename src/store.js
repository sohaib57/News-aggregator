import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from './features/articlesSlice';
import userPreferencesReducer from './features/userPreferencesSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    userPreferences: userPreferencesReducer,
  },
});

export default store;
