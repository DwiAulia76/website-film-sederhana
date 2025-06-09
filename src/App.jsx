import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GenrePage from "./pages/Genre";
import Movie from "./pages/Movie";
import TVShow from "./pages/TVShow";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResult";
import MovieDetail from "./components/DetailFilm";
import { useParams } from "react-router-dom";

import "./App.css";

function MovieDetailWrapper() {
  const { movieId } = useParams();
  return <MovieDetail movieId={movieId} />;
}

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
        <Route path="/movies/:movieId" element={<MovieDetailWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
