import React, { useState, useEffect } from "react";
import MovieCard from "../../components/movieCard/movieCard";
import TvShowCard from "../../components/tvShowCard/tvShowCard";
import newRequest from "../../utils/newRequest";
import { movies } from "../../../data.js";
import { tvShows } from "../../../tvs.js";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await newRequest.get("/favorites");
      // Filter only favorites with favoriteState true
      const activeFavorites = response.data.filter(fav => fav.favoriteState);
      setFavorites(activeFavorites);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteRemove = async (itemId, type) => {
    try {
      const response = await newRequest.post('/favorites/toggle', {
        itemId,
        type
      });
      if (!response.data.isFavorite) {
        // Immediately remove from UI
        setFavorites(prev => prev.filter(fav => 
          type === 'movie' ? fav.movieId !== itemId : fav.showId !== itemId
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getFavoriteContent = (favorite) => {
    if (favorite.type === 'movie') {
      return movies.find(movie => movie.imdbID === favorite.movieId);
    } else {
      return tvShows.find(show => show.id === parseInt(favorite.showId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center justify-center w-full mt-7">
          <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="bg-white font-medium text-5xl text-gray-700">
              My Favorites
            </h1>
          </div>
        </div>

        <div className="flex justify-end p-4 sticky top-0 bg-white z-10">
          <button
            onClick={() => setViewType("grid")}
            className={`mr-2 px-4 py-2 rounded transition-colors ${
              viewType === "grid" ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`px-4 py-2 rounded transition-colors ${
              viewType === "list" ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            List
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img src="/folder.png" alt="No favorites" className="w-32 h-32 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-500">
              Start adding movies and shows to your favorites!
            </p>
          </div>
        ) : (
          <div className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}>
            {favorites.map((favorite) => {
              const content = getFavoriteContent(favorite);
              if (!content) return null;

              return favorite.type === 'movie' ? (
                <MovieCard
                  key={favorite.movieId}
                  movie={content}
                  viewType={viewType}
                  isFavorite={true}
                  onFavoriteToggle={() => handleFavoriteRemove(favorite.movieId, 'movie')}
                />
              ) : (
                <TvShowCard
                  key={favorite.showId}
                  show={content}
                  viewType={viewType}
                  isFavorite={true}
                  onFavoriteToggle={() => handleFavoriteRemove(favorite.showId, 'show')}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
