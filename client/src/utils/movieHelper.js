import newRequest from './newRequest';

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
