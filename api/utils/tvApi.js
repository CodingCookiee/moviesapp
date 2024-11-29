import dotenv from "dotenv";
dotenv.config();

const accessToken = process.env.TMDB_ACCESS_TOKEN;

export const searchTvByQuery = async (query, page = 1) => {
  const baseUrl = `https://api.themoviedb.org/3/search/tv`;
  const params = new URLSearchParams({
    query: query,
    language: "en-US",
    page: page,
    include_adult: false,
    "first_air_date.gte": "2010-01-01",
    sort_by: "vote_average.desc,popularity.desc",
    "vote_count.gte": "100",
    "vote_average.gte": "6.0",
    with_status: "0,2",
    with_type: "0,4",
    with_original_language: "en",
    region: "US",
    "with_runtime.gte": "20",
  });

  const url = `${baseUrl}?${params.toString()}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const searchShows = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const searchFeaturedShows = async () => {
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const searchTopRatedShows = async () => {
  const url = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};

export const getShowDetails = async (showId) => {
  const url = `https://api.themoviedb.org/3/tv/${showId}?language=en-US&append_to_response=videos,watch/providers`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

export const getSeasonDetails = async (showId, seasonNumber) => {
  const url = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?language=en-US&append_to_response=videos`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options);
};
