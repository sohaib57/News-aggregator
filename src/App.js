import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":categoryId" element={<CategoryDetailPage />} />
          <Route path="search" element={<SearchResultsPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;