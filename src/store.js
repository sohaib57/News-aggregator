import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/newsSlice"; // Update to newsSlice
import topHeadlinesReducer from "./features/topHeadlinesSlice";
import guardianSearchReducer from "./features/guardianSearchSlice"; 

const store = configureStore({
  reducer: {
    news: newsReducer, // Updated to news
    topHeadlines: topHeadlinesReducer,
    guardianSearch: guardianSearchReducer, // Add this if you use guardianSearchSlice
  },
});

export default store;
