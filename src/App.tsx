import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChapterReader from "./pages/ChapterReader";
import MangaList from "./pages/MangaList";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mangas" element={<MangaList />} />
          <Route path="/chapter/:id" element={<ChapterReader />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
