import express from "express";
import {
  getTvShows,
  getFeaturedShows,
  getShowById,
  getShowSeasonDetails,
  getTopRatedShows,
  getTvByQuery,
} from "../Controllers/tv.controller.js";

const router = express.Router();

router.get("/search", getTvByQuery);
router.get("/", getTvShows);
router.get("/featured", getFeaturedShows);
router.get("/top-rated", getTopRatedShows);
router.get("/:id", getShowById);
router.get("/:id/season/:seasonNumber", getShowSeasonDetails);

export default router;
