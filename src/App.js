import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":categoryId" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
