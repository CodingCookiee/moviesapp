import {
  searchShows,
  searchFeaturedShows,
  getShowDetails,
  getSeasonDetails,
  searchTopRatedShows,
  searchTvByQuery,
} from '../utils/tvApi.js';

export const getTvByQuery = async (req, res, next) => {
  try {
    const query = req.query.query;
    const page = req.query.page || 1;
    const response = await searchTvByQuery(query, page);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getTvShows = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const response = await searchShows(page);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getFeaturedShows = async (req, res, next) => {
  try {
    const response = await searchFeaturedShows();
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getTopRatedShows = async (req, res, next) => {
  try {
    const response = await searchTopRatedShows();
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getShowById = async (req, res, next) => {
  try {
    const response = await getShowDetails(req.params.id);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: 'Show not found' });
  }
};

export const getShowSeasonDetails = async (req, res, next) => {
  try {
    const { id, seasonNumber } = req.params;
    const response = await getSeasonDetails(id, seasonNumber);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
