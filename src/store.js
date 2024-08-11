import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./features/articlesSlice";
import topHeadlinesReducer from "./features/topHeadlinesSlice";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    topHeadlines: topHeadlinesReducer,
  },
});

export default store;
