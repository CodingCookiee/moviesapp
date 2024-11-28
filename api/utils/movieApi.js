import dotenv from "dotenv";
dotenv.config();


const accessToken = process.env.TMDB_ACCESS_TOKEN;

export const searchMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(url, options);
  return response;
};

export const searchFeaturedMovies = async () => {
  const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const searchLatestMovies = async () => {
  const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const getMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=videos,credits,watch/providers`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const getGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const searchMoviesByGenre = async (genreId, page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=${page}&include_adult=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};
