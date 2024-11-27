const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const searchShows = async (pages) => {
  
  const url = `https://api.themoviedb.org/3/tv/changes?page=${pages}`;
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
}



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






