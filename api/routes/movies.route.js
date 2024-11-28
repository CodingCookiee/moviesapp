import express from 'express';
import { 
  getMovies, 
  getFeaturedMovies, 
  getMovieById, 
  getMovieGenres,
  getMoviesByGenre,
  getLatestMovies 
} from '../controllers/movies.controller.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/featured', getFeaturedMovies);
router.get('/latest', getLatestMovies);
router.get('/genres', getMovieGenres);
router.get('/genre/:genreId', getMoviesByGenre);
router.get('/:id', getMovieById);

export default router;
