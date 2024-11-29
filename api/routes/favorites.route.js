import express from 'express';
import {
  toggleFavorite,
  getFavorites,
  checkFavoriteStatus,
} from '../Controllers/favorites.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/toggle', verifyToken, toggleFavorite);
router.get('/', verifyToken, getFavorites);
router.get('/check/:itemId', verifyToken, checkFavoriteStatus);

export default router;
