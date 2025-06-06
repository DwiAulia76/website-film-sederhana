import React, { useState, useEffect } from "react";
import { getTrendingMovies, getMovieList, getTvShowList } from "../api";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";

function Home() {
  const [trending, setTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);

  // Ambil data trending
  useEffect(() => {
    setLoadingTrending(true);
    getTrendingMovies()
      .then(setTrending)
      .catch((err) => console.error("Error fetching trending movies:", err))
      .finally(() => setLoadingTrending(false));
  }, []);

  // Ambil data popular movies & TV shows
  useEffect(() => {
    setLoadingPopular(true);
    Promise.all([getMovieList(), getTvShowList()])
      .then(([movieResults, tvResults]) => {
        setMovies(movieResults);
        setTvShows(tvResults);
      })
      .catch((err) => console.error("Error fetching popular content:", err))
      .finally(() => setLoadingPopular(false));
  }, []);

  return (
    <div style={{ marginLeft: "10rem", marginRight: "10rem" }}>
      {/* Trending Movies */}
      <h2 style={{ marginTop: "2rem" }}>🔥 Trending Movies Today</h2>
      {loadingTrending ? (
        <p>Loading trending movies...</p>
      ) : (
        <div style={gridStyle}>
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Popular Movies */}
      <h2 style={{ marginTop: "2rem" }}>🎬 Popular Movies</h2>
      {loadingPopular ? (
        <p>Loading popular movies...</p>
      ) : (
        <div style={gridStyle}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Popular TV Shows */}
      <h2 style={{ marginTop: "2rem" }}>📺 Popular TV Shows</h2>
      {loadingPopular ? (
        <p>Loading popular TV shows...</p>
      ) : (
        <div style={gridStyle}>
          {tvShows.map((tv) => (
            <TvShowCard key={tv.id} tv={tv} />
          ))}
        </div>
      )}
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "1rem",
  padding: "1rem 0",
};

export default Home;
