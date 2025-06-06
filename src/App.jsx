import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GenrePage from "./pages/Genre";
import Movie from "./pages/Movie";
import TVShow from "./pages/TVShow";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResult";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tvshow" element={<TVShow />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
