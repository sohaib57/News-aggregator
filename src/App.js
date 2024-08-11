import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":categoryId" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} /> {/* Add route for search */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;