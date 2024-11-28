import dotenv from 'dotenv';
dotenv.config();


const accessToken = process.env.TMDB_ACCESS_TOKEN;

export const searchShows = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  return fetch(url, options);
};

export const searchFeaturedShows = async () => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  return fetch(url, options);
};

export const searchTopRatedShows = async () => {
  const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  return fetch(url, options);
};

export const getShowDetails = async (showId) => {
  const url = `https://api.themoviedb.org/3/tv/${showId}?language=en-US&append_to_response=videos,watch/providers`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
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
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  return fetch(url, options);
};
