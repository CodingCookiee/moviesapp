import React, { useState } from "react";
import MovieCard from "../../components/movieCard/movieCard";
import TvShowCard from "../../components/tvShowCard/tvShowCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Favorites = () => {
  const [viewType, setViewType] = useState("grid");


const { isLoading, error, data: favorites, refetch } = useQuery({
  queryKey: ['favorites'],
  queryFn: async () => {
    const response = await newRequest.get("/favorites");
    return response.data;
  }
});


  const handleFavoriteRemove = async (itemId, type) => {
    try {
      await newRequest.post("/favorites/toggle", {
        itemId,
        type,
      });
      refetch();
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (isLoading) {
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

        {!favorites.length ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="/folder.png"
              alt="No favorites"
              className="w-32 h-32 mb-6"
            />
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
              if (favorite.type === "movie" && favorite.movieData) {
                return (
                  <MovieCard
                    key={favorite.movieData.id}
                    movie={favorite.movieData}
                    viewType={viewType}
                    isFavorite={true}
                    onFavoriteToggle={() => handleFavoriteRemove(favorite.movieData.id, "movie")}
                  />
                );
              }
              if (favorite.type === "show" && favorite.showData) {
                return (
                  <TvShowCard
                    key={favorite.showData.id}
                    show={favorite.showData}
                    viewType={viewType}
                    isFavorite={true}
                    onFavoriteToggle={() => handleFavoriteRemove(favorite.showData.id, "show")}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
