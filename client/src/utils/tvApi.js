const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;


export const searchShows = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=popularity.desc&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  return await fetch(url, options);
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
  return await fetch(url, options);
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
  return await fetch(url, options);
};

export const getShowDetails = async (showId) => {
  const url = `https://api.themoviedb.org/3/tv/${showId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  return await fetch(url, options);
};






