import React, { useState } from "react";
import MovieCard from "../movieCard/movieCard";
import TvShowCard from "../tvShowCard/tvShowCard";  
import { movies } from "../../../data.js";
import { tvShows } from '../../../tvs.js'

const Featured = () => {
  const [viewType, setViewType] = useState("grid");
  const mostWatched = movies.slice(0, 12);
  const latestMovies = movies.slice(12, 24);
  const latestSeasons = tvShows.slice(0, 16);

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

      {/* Most Watched Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="">
            <div className="h-[40px]  bg-yellow-400 w-[10px]"></div>
          </div>
          <h2 className="text-2xl font-bold mb-1">Featured - Most Watched</h2>
        </div>
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {mostWatched.map((movie, index) => (
            <MovieCard
              key={movie.imdbID || index}
              movie={movie}
              viewType={viewType}
              isFeatured={true}
            />
          ))}
        </div>
      </div>

      {/* Latest Movies Section */}
      <div className="mb-12">
      <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="">
            <div className="h-[40px]  bg-yellow-400 w-[10px]"></div>
          </div>
          <h2 className="text-2xl font-bold mb-1">Latest Movies</h2>
        </div>
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {latestMovies.map((movie, index) => (
            <MovieCard
              key={movie.imdbID || index}
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
          {latestSeasons.map((show, index) => (
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
