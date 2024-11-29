import dotenv from "dotenv";
dotenv.config();


const accessToken = process.env.TMDB_ACCESS_TOKEN;

export const searchMoviesByQuery = async (query, page = 1) => {
  const baseUrl = `https://api.themoviedb.org/3/search/movie`;
  const params = new URLSearchParams({
    query: query,
    language: 'en-US',
    page: page,
    include_adult: false,
    'sort_by': 'vote_average.desc,popularity.desc',
    'vote_count.gte': '100',
    'vote_average.gte': '7.0',
    'with_original_language': 'en',
    region: 'US',
    'with_runtime.gte': '60',
    'primary_release_date.gte': '2000-01-01',
    'release_date.gte': '2000-01-01',
    'year.gte': '2000',
    'with_release_type': '2,3',
    certification_country: 'US',
    'certification.lte': 'R'
  });

  const url = `${baseUrl}?${params.toString()}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  return fetch(url, options);
};





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
  const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
  const params = new URLSearchParams({
    with_genres: genreId,
    language: 'en-US',
    sort_by: 'vote_average.desc,popularity.desc',
    page: page.toString(),
    include_adult: 'false',
    'vote_count.gte': '200',
    'vote_average.gte': '6',
    'with_runtime.gte': '60',
  });

  const url = `${baseUrl}?${params.toString()}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
  return fetch(url, options);
};



