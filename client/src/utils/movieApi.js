import axios from "axios";

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const searchMovies = async (pages) => {
  const url = `https://api.themoviedb.org/3/movie/changes?page=${pages}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchFeaturedMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await fetch(url, options);
};

export const searchLatestMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await fetch(url, options);
};

export const getMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await fetch(url, options);
};
