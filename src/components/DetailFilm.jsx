import React, { useState, useEffect } from "react";
import { getMovieDetail } from "../api";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      const data = await getMovieDetail(movieId);
      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        color: "#fff",
        padding: "1rem",
        background: "#1c1c1c",
        minHeight: "100vh",
      }}
    >
      <img
        src={imageBaseUrl + movie.poster_path}
        alt={movie.title}
        style={{
          display: "flex",
          height: "300px",
          width: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div>
        <h2 style={{ fontSize: "1.8rem" }}>
          {movie.title}{" "}
          <span style={{ color: "#999" }}>
            ({new Date(movie.release_date).getFullYear()})
          </span>
        </h2>
        {movie.tagline && (
          <p
            style={{ fontStyle: "italic", marginTop: "0.5rem", color: "#aaa" }}
          >
            {movie.tagline}
          </p>
        )}
        <p style={{ marginTop: "1rem" }}>{movie.overview}</p>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.9rem",
            color: "#ccc",
          }}
        >
          <div>👁️ {movie.popularity.toFixed(0)}K</div>
          <div>💬 27K</div>
          <div>❤️ {movie.vote_count.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
