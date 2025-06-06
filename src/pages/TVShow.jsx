import React, { useState, useEffect } from "react";
import TvShowCard from "../components/TvShowCard";
import { getTvShowList } from "../api";

function TvShow() {
  const [TvShow, setTvShows] = useState([]);

  useEffect(() => {
    getTvShowList().then(setTvShows);
  }, []);

  return (
    <div style={{ marginLeft: "12rem", marginRight: "12rem" }}>
      <h1>TV Shows</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {TvShow.map((tv) => (
          <TvShowCard key={tv.id} tv={tv} />
        ))}
      </div>
    </div>
  );
}

export default TvShow;
