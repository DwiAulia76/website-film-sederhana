import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovie, searchTvShow } from "../api";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("query") || "";
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      Promise.all([searchMovie(query), searchTvShow(query)])
        .then(([movieResults, tvResults]) => {
          setMovies(movieResults);
          setTvShows(tvResults);
        })
        .catch((err) => console.error("Error saat mencari:", err))
        .finally(() => setLoading(false));
    } else {
      setMovies([]);
      setTvShows([]);
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      {loading && <p>Loading...</p>}

      <h2>Movies</h2>
      <div style={gridStyle}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      <h2>TV Shows</h2>
      <div style={gridStyle}>
        {tvShows.length > 0 ? (
          tvShows.map((tv) => <TvShowCard key={tv.id} tv={tv} />)
        ) : (
          <p>No TV shows found.</p>
        )}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "1rem",
  padding: "1rem 0",
};

export default SearchResults;
