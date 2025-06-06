import React, { useEffect, useState } from "react";
import { getGenres, getMoviesByGenre, getTvShowByGenre } from "../api";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";

function GenrePage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGenres()
      .then(setGenres)
      .catch((err) => console.error("Error fetching trending movies:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedGenre) return;

      try {
        const [moviesResult, tvShowsResult] = await Promise.all([
          getMoviesByGenre(selectedGenre),
          getTvShowByGenre(selectedGenre),
        ]);
        setMovies(moviesResult);
        setTvShows(tvShowsResult);
      } catch (error) {
        console.error("Error fetching data by genre:", error);
      }
    };

    fetchData();
  }, [selectedGenre]);

  return (
    <div style={{ marginLeft: "12rem", marginRight: "12rem" }}>
      <h1>Explore by Genre</h1>
      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
      >
        <option value="" disabled>
          Select Genre
        </option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <h2>Movies</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
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
      )}

      <h2>TV Shows</h2>
      {loading ? (
        <p>Loading Tvshow...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {tvShows.map((tv) => (
            <TvShowCard key={tv.id} tv={tv} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GenrePage;
