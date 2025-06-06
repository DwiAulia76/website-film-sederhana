// untuk data APInya sendiri berada di file .env
import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_BASEURL;

export const getMovieList = async () => {
  try {
    const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return movie.data.results;
  } catch (error) {
    console.error("Gagal fetch movie list:", error);
    return [];
  }
};

export const searchMovie = async (q) => {
  try {
    const searchMovie = await axios.get(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${q}&api_key=${apiKey}`
    );
    return searchMovie.data.results;
  } catch (error) {
    console.error("Gagal mencari movie:", error);
    return [];
  }
};

export const getTrendingMovies = async () => {
  try {
    const trending = await axios.get(
      `${baseUrl}/trending/movie/day?api_key=${apiKey}`
    );
    return trending.data.results;
  } catch (error) {
    console.error("Gagal fetch trending movies:", error);
    return [];
  }
};

export const addToFavorite = (item) => {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];

  // Cek apakah item sudah ada
  if (stored.some((fav) => fav.id === item.id)) return;

  const isMovie = !!item.title || item.media_type === "movie";

  // Normalisasi data
  const newItem = {
    ...item,
    media_type: isMovie ? "movie" : "tv",
    title: item.title || item.name || "Untitled",
    name: item.name || item.title || "Untitled", // biar TvShowCard juga aman
  };

  localStorage.setItem("favorites", JSON.stringify([...stored, newItem]));
};

export const removeFromFavorite = (id) => {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  const updated = stored.filter((item) => item.id !== id);
  localStorage.setItem("favorites", JSON.stringify(updated));
};

export const isFavorite = (id) => {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  return stored.some((item) => item.id === id);
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const getTvShowList = async () => {
  try {
    const tv = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}`);
    return tv.data.results;
  } catch (error) {
    console.error("Gagal fetch TV shows:", error);
    return [];
  }
};

export const searchTvShow = async (q) => {
  try {
    const searchTvShow = await axios.get(
      `${baseUrl}/search/tv?api_key=${apiKey}&query=${q}`
    );
    return searchTvShow.data.results;
  } catch (error) {
    console.error("Gagal mencari TV show:", error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/genre/movie/list?api_key=${apiKey}`
    );
    return res.data.genres; // [{ id, name }]
  } catch (error) {
    console.error("Gagal fetch genres:", error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    const res = await axios.get(
      `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    );
    return res.data.results;
  } catch (error) {
    console.error("Gagal fetch movies by genre:", error);
    return [];
  }
};

export const getTvShowByGenre = async (genreId) => {
  try {
    const res = await axios.get(
      `${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=${genreId}`
    );
    return res.data.results;
  } catch (error) {
    console.error("Gagal fetch movies by genre:", error);
    return [];
  }
};
