import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addToFavorite, removeFromFavorite, isFavorite } from "../api";

function MovieCard({ movie }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    if (fav) {
      removeFromFavorite(movie.id);
      setFav(false);
    } else {
      addToFavorite(movie);
      setFav(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
      {/* Ganti <img> biasa jadi Link biar klik gambar ke detail */}
      <Link to={`/movies/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.title || "Untitled"}
          style={{ width: "100%", borderRadius: 8, cursor: "pointer" }}
        />
      </Link>
      <h3>
        {movie.title || "Untitled"}{" "}
        {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
      </h3>

      <button onClick={toggleFavorite}>
        {fav ? "Remove from Favorite ❤️" : "Add to Favorite 🤍"}
      </button>
    </div>
  );
}

export default MovieCard;
