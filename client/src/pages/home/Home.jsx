import React, { useState } from "react";
import Hero from "../../components/hero/Hero";
import MovieCard from "../../components/movieCard/movieCard";
import { movies } from "../../../data.js";

const Home = () => {
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

 

  // Calculate pagination
  const firstPageItems = 12;
  const indexOfLastMovie =
    currentPage === 1
      ? firstPageItems
      : firstPageItems + (currentPage - 1) * 16;
  const indexOfFirstMovie =
    currentPage === 1 ? 0 : firstPageItems + (currentPage - 2) * 16;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
 

  return (
    <div className="home min-h-screen">
      {currentPage === 1 && <Hero />}

      <div className="max-w-7xl mx-auto px-4">
        {currentPage !== 1 && (
          <div>
            <div className="inline-flex items-center justify-center w-full mt-7">
              <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded " />
              <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
                <h1 className="bg-white font-medium text-5xl text-gray-700 ">
                  Movies
                </h1>
              </div>
            </div>
          </div>
        )}
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

        {/* Movies Container */}
        <div
          className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
        >
          {currentMovies.map((movie, index) => (
            <MovieCard
              key={movie.imdbID || index}
              movie={movie}
              viewType={viewType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;