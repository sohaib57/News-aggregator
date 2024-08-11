import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./features/articlesSlice";
import topHeadlinesReducer from "./features/topHeadlinesSlice";
import guardianSearchReducer from "./features/guardianSearchSlice"; // Make sure to rename to match the default export

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    topHeadlines: topHeadlinesReducer,
    guardianSearch: guardianSearchReducer, // Add this if you use guardianSearchSlice
  },
});

export default store;
