import React, { useState, useEffect } from "react";
import { getFavorites } from "../api";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";

function FavoriteList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (favorites.length === 0) return <p>No favorite movies yet.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 16,
        margin: "10rem",
      }}
    >
      {favorites.map((item) =>
        item.media_type === "movie" ? (
          <MovieCard key={item.id} movie={item} />
        ) : (
          <TvShowCard key={item.id} tv={item} />
        )
      )}
    </div>
  );
}

export default FavoriteList;
