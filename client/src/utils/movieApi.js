import axios from "axios";

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const searchMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await fetch(url, options);
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

export const getGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response
      throw new Error(`Genre fetch failed: ${response.status} - ${errorData.status_message || response.statusText}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return []; // Return an empty array on error
  }
};


export const searchMoviesByGenre = async (genreId, page = 1) => {
  const numericGenreId = parseInt(genreId, 10); // Ensure genreId is an integer

  if (isNaN(numericGenreId)) {
    console.error("Invalid genreId:", genreId);
    return { results: [], total_pages: 0 }; //Return empty result if invalid.
  }

  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${numericGenreId}&language=en-US&sort_by=popularity.desc&page=${page}&include_adult=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Movie fetch failed: ${response.status} - ${errorData.status_message || response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { results: [], total_pages: 0 }; // Return empty results on error
  }
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
