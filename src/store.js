import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/newsSlice";
import topHeadlinesReducer from "./features/topHeadlinesSlice";
import guardianSearchReducer from "./features/guardianSearchSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    topHeadlines: topHeadlinesReducer,
    guardianSearch: guardianSearchReducer,
  },
});

export default store;
