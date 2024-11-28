import newRequest from './newRequest';


export const searchMoviesByQuery = async (query, page = 1) => {
  const encodedQuery = encodeURIComponent(query);
  return await newRequest.get(`/movies/search?query=${encodedQuery}&page=${page}`);
};



export const searchMovies = async (page = 1) => {
  return await newRequest.get(`/movies?page=${page}`);
};

export const searchFeaturedMovies = async () => {
  return await newRequest.get('/movies/featured');
};

export const searchLatestMovies = async () => {
  return await newRequest.get('/movies/latest');
};

export const getMovieDetails = async (movieId) => {
  return await newRequest.get(`/movies/${movieId}`);
};

export const getGenres = async () => {
  return await newRequest.get('/movies/genres');
};

export const searchMoviesByGenre = async (genreId, page = 1) => {
  return await newRequest.get(`/movies/genre/${genreId}?page=${page}`);
};



