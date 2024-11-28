import React, { useState } from "react";
import MovieCard from "../../components/movieCard/movieCard";
import { useQuery } from "@tanstack/react-query";
import { searchFeaturedMovies, searchLatestMovies, getMovieDetails } from "../../utils/movieHelper.js";

const Top50 = () => {
  const [viewType, setViewType] = useState("grid");

  const { isLoading: featuredLoading, error: featuredError, data: featuredMovies } = useQuery({
    queryKey: ['top25Featured'],
    queryFn: async () => {
      const response = await searchFeaturedMovies();
      return response.data.results || [];
    }
  });
  
  const { isLoading: latestLoading, error: latestError, data: latestMovies } = useQuery({
    queryKey: ['top25Latest'],
    queryFn: async () => {
      const response = await searchLatestMovies();
      return response.data.results || [];
    }
  });
  

  if (featuredLoading || latestLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (featuredError || latestError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-600">{featuredError?.message || latestError?.message}</p>
      </div>
    );
  }

  const allMovies = [...(featuredMovies || []), ...(latestMovies || [])]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 50);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center justify-center w-full mt-7">
          <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="bg-white font-medium text-5xl text-gray-700">
              Top 50 Movies
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

        <div className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}>
          {allMovies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              viewType={viewType}
              isFeatured={index < 10}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top50;
