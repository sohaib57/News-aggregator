import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../features/articlesSlice"; // For Everything API
import { getTopHeadlines } from "../features/topHeadlinesSlice"; // For Top Headlines API
import { searchGuardianArticles } from "../features/guardianSearchSlice"; // For Guardian API
import { useEffect } from "react";

const useArticles = (query, isSearch = false, apiSource = "everything") => {
  const dispatch = useDispatch();

  const selectArticlesState = (state) => {
    switch (apiSource) {
      case "everything":
        return state.articles;
      case "topHeadlines":
        return state.topHeadlines;
      case "guardian":
        return state.guardianSearch;
      default:
        return state.articles;
    }
  };

  const { articles, status, error, filters } = useSelector(selectArticlesState);

  useEffect(() => {
    if (apiSource === "guardian") {
      dispatch(searchGuardianArticles(query));
    } else if (apiSource === "topHeadlines") {
      dispatch(getTopHeadlines({ query, ...filters }));
    } else {
      dispatch(getArticles({ query, filters }));
    }
  }, [dispatch, query, filters, apiSource]);

  return { articles, status, error };
};

export default useArticles;
