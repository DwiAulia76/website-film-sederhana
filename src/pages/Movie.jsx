import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getMovieList } from "../api";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovieList().then(setMovies);
  }, []);

  return (
    <div style={{ marginLeft: "10rem", marginRight: "10rem" }}>
      <h1>Popular Movies</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
