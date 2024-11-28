import React, { useState } from "react";
import MovieCard from "../movieCard/movieCard";
import TvShowCard from "../tvShowCard/tvShowCard";
import { useQuery } from "@tanstack/react-query";
import {
  searchFeaturedMovies,
  searchLatestMovies,
  getMovieDetails,
} from "../../utils/movieHelper.js";
import {
  searchFeaturedShows,
  searchTopRatedShows,
  getShowDetails,
} from "../../utils/tvHelper.js";

const Featured = () => {
  const [viewType, setViewType] = useState("grid");

  const featuredMoviesQuery = useQuery({
    queryKey: ["featuredMovies"],
    queryFn: async () => {
      const response = await searchFeaturedMovies();
      return response.data.results || [];
    },
  });

  const featuredTvShowsQuery = useQuery({
    queryKey: ["featuredTvShows"],
    queryFn: async () => {
      const response = await searchFeaturedShows();
      return response.data.results || [];
    },
  });

  const latestMoviesQuery = useQuery({
    queryKey: ["latestMovies"],
    queryFn: async () => {
      const response = await searchLatestMovies();
      return response.data.results || [];
    },
  });

  const latestTvShowsQuery = useQuery({
    queryKey: ["latestTvShows"],
    queryFn: async () => {
      const response = await searchTopRatedShows();
      return response.data.results || [];
    },
  });

  if (featuredMoviesQuery.isLoading || latestMoviesQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (featuredMoviesQuery.error || latestMoviesQuery.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600">
          {featuredMoviesQuery.error?.message ||
            latestMoviesQuery.error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* View Toggle */}
      <div className="flex justify-end p-4 sticky top-0 bg-white z-10">
        <button
          onClick={() => setViewType("grid")}
          className={`mr-2 px-4 py-2 rounded transition-colors ${
            viewType === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setViewType("list")}
          className={`px-4 py-2 rounded transition-colors ${
            viewType === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          List
        </button>
      </div>

      {/* Featured Movies Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
          <h2 className="text-2xl font-bold mb-1">Featured - Most Watched</h2>
        </div>
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {featuredMoviesQuery.data?.map((movie, index) => (
            <MovieCard
              key={movie.trackId || index}
              movie={movie}
              viewType={viewType}
              isFeatured={true}
            />
          ))}
        </div>
      </div>

      {/* Featured Seasons Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
          <h2 className="text-2xl font-bold mb-1">Featured - TV Shows</h2>
        </div>
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {featuredTvShowsQuery.data?.map((show) => (
            <TvShowCard
              key={show.id}
              show={show}
              viewType={viewType}
              isFeatured={true}
            />
          ))}
        </div>
      </div>

      {/* Latest Movies Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
          <h2 className="text-2xl font-bold mb-1">Latest Movies</h2>
        </div>
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {latestMoviesQuery.data?.map((movie, index) => (
            <MovieCard
              key={movie.trackId || index}
              movie={movie}
              viewType={viewType}
              isFeatured={false}
            />
          ))}
        </div>
      </div>
      {/* Latest Seasons Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="">
            <div className="h-[40px]  bg-yellow-400 w-[10px]"></div>
          </div>
          <h2 className="text-2xl font-bold mb-1">Latest Seasons</h2>
        </div>
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {latestTvShowsQuery.data?.map((show, index) => (
            <TvShowCard
              key={show.id || index}
              show={show}
              viewType={viewType}
              isFeatured={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Featured;
