import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Navbar() {
  const [query, setQuery] = useState(""); // Tambahkan ini

  return (
    <nav style={{ justifyContent: "center" }}>
      <Link to="/">Home</Link>
      <Link to="/genre">Genre</Link>
      <Link to="/movie">Movie</Link>
      <Link to="/tvshow">TVShow</Link>
      <Link to="/favorites">Favorites</Link>

      <SearchBar query={query} setQuery={setQuery} />
    </nav>
  );
}

export default Navbar;
