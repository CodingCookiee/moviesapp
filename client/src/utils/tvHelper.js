import newRequest from "./newRequest";

export const searchTvByQuery = async (query, page = 1) => {
  const encodedQuery = encodeURIComponent(query);
  return await newRequest.get(`/tv/search?query=${encodedQuery}&page=${page}`);
};

export const searchShows = async (page = 1) => {
  return await newRequest.get(`/tv?page=${page}`);
};

export const searchFeaturedShows = async () => {
  return await newRequest.get("/tv/featured");
};

export const searchTopRatedShows = async () => {
  return await newRequest.get("/tv/top-rated");
};

export const getShowDetails = async (showId) => {
  return await newRequest.get(`/tv/${showId}`);
};

export const getSeasonDetails = async (showId, seasonNumber) => {
  return await newRequest.get(`/tv/${showId}/season/${seasonNumber}`);
};
