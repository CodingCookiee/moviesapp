import Favorite from "../models/favorites.model.js";
import createError from "../utils/createError.js";
import { getMovieDetails } from "../utils/movieApi.js";
import { getShowDetails } from "../utils/tvApi.js";

export const checkFavoriteStatus = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { itemId } = req.params;

    const favorite = await Favorite.findOne({
      userId,
      $or: [
        { movieId: itemId, favoriteState: true },
        { showId: itemId, favoriteState: true },
      ],
    });

    return res.status(200).json({ isFavorite: !!favorite });
  } catch (err) {
    next(createError(500, "Error checking favorite status"));
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { itemId, type } = req.body;

    const existing = await Favorite.findOne({
      userId,
      [type === "movie" ? "movieId" : "showId"]: itemId,
    });

    if (existing) {
      existing.favoriteState = !existing.favoriteState;
      await existing.save();
      return res.status(200).json({ isFavorite: existing.favoriteState });
    }

    const newFavorite = new Favorite({
      userId,
      [type === "movie" ? "movieId" : "showId"]: itemId,
      type,
      favoriteState: true,
    });
    await newFavorite.save();
    return res.status(201).json({ isFavorite: true });
  } catch (err) {
    next(createError(500, "Error processing favorite"));
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({
      userId: req.userId,
      favoriteState: true,
    });

    const populatedFavorites = await Promise.all(
      favorites.map(async (favorite) => {
        try {
          if (favorite.type === "movie") {
            const response = await getMovieDetails(favorite.movieId);
            const movieData = await response.json();
            return { ...favorite.toObject(), movieData };
          } else {
            const response = await getShowDetails(favorite.showId);
            const showData = await response.json();
            return { ...favorite.toObject(), showData };
          }
        } catch (error) {
          console.error(
            `Error fetching details for ${favorite.type} ${favorite.movieId || favorite.showId}:`,
            error,
          );
          return favorite.toObject();
        }
      }),
    );

    res.status(200).json(populatedFavorites);
  } catch (err) {
    next(createError(500, "Error fetching favorites"));
  }
};
