import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../features/newsSlice"; // For Everything API
import { getTopHeadlines } from "../features/topHeadlinesSlice"; // For Top Headlines API
import { searchGuardianNews } from "../features/guardianSearchSlice"; // For Guardian API
import { useEffect } from "react";

const useMultiSourceNews  = (query, isSearch = false, apiSource = "everything") => {
  const dispatch = useDispatch();

  const selectArticlesState = (state) => {
    switch (apiSource) {
      case "everything":
        return state.news; // Ensure this matches your newsSlice state key
      case "topHeadlines":
        return state.topHeadlines;
      case "guardian":
        return state.guardianSearch; // Ensure this matches your guardianSearchSlice state key
      default:
        return state.news;
    }
  };

  const { news, status, error, filters } = useSelector(selectArticlesState);

  useEffect(() => {
    if (apiSource === "guardian") {
      dispatch(searchGuardianNews(query));
    } else if (apiSource === "topHeadlines") {
      dispatch(getTopHeadlines({ query }));
    } else {
      dispatch(getNews({ query, filters }));
    }
  }, [dispatch, query, apiSource]);

  return { news, status, error };
};

export default useMultiSourceNews;
