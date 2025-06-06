import React, { useState, useEffect } from "react";
import { addToFavorite, removeFromFavorite, isFavorite } from "../api";

function TvShowCard({ tv }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(tv.id));
  }, [tv.id]);

  const toggleFavorite = () => {
    if (fav) {
      removeFromFavorite(tv.id);
      setFav(false);
    } else {
      addToFavorite(tv);
      setFav(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
      <img
        src={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w200${tv.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={tv.name}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <h3>
        {tv.name}{" "}
        {tv.first_air_date ? `(${tv.first_air_date.slice(0, 4)})` : ""}
      </h3>

      <button onClick={toggleFavorite}>
        {fav ? "Remove from Favorite ❤️" : "Add to Favorite 🤍"}
      </button>
    </div>
  );
}

export default TvShowCard;
