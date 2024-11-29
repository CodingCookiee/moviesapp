import express from 'express';
import {
  getMovies,
  getFeaturedMovies,
  getMovieById,
  getMovieGenres,
  getMoviesByGenre,
  getLatestMovies,
  getMoviesByQuery,
} from '../controllers/movies.controller.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/featured', getFeaturedMovies);
router.get('/latest', getLatestMovies);
router.get('/genres', getMovieGenres);
router.get('/genre/:genreId', getMoviesByGenre);
router.get('/search', getMoviesByQuery);
router.get('/:id', getMovieById);

export default router;
