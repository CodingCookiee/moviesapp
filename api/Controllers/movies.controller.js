import { 
  searchMovies, 
  searchFeaturedMovies, 
  getMovieDetails,
  getGenres,
  searchMoviesByGenre,
  searchLatestMovies ,
  searchMoviesByQuery
} from '../utils/movieApi.js';


export const getMoviesByQuery = async (req, res, next) => {
  try {
    const { query } = req.query;
    const page = req.query.page || 1;
    const response = await searchMoviesByQuery(query, page);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};


  
  export const getMovies = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const response = await searchMovies(page);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  export const getFeaturedMovies = async (req, res, next) => {
    try {
      const response = await searchFeaturedMovies();
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  export const getLatestMovies = async (req, res, next) => {
    try {
      const response = await searchLatestMovies();
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  export const getMovieById = async (req, res, next) => {
    try {
      const response = await getMovieDetails(req.params.id);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  export const getMovieGenres = async (req, res, next) => {
    try {
      const response = await getGenres();
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  
  export const getMoviesByGenre = async (req, res, next) => {
    try {
      const { genreId } = req.params;
      const page = req.query.page || 1;
      const response = await searchMoviesByGenre(genreId, page);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

