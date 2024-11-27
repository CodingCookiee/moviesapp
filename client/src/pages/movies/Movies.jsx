import React, { useState } from "react";
import MovieCard from "../../components/movieCard/movieCard";
import { movies } from "../../../data.js";
import {  } from "../../utils/movieApi.js";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('')

 
  const remainingMovies = movies.slice(12);
  
  const { data: featuredMovies } = useQuery(['featuredMovies'], 
    () => fetchMovies({ limit: 16 }))

  const { data } = useQuery(['search', searchTerm], 
    () => fetchMovies({ term: searchTerm }))


  // Calculate pagination for Movie Night section
  const indexOfLastMovie = currentPage * 16;
  const indexOfFirstMovie = indexOfLastMovie - 16;
  const currentMovies = remainingMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(remainingMovies.length / 16);

  return (
    <div className="home min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
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
        {/* Featured Movies Section */}
        <div className="mb-12">
        <div className="flex items-center gap-2.5 ml-4 mb-6">
          <div className="">
            <div className="h-[40px]  bg-yellow-400 w-[10px]"></div>
          </div>
          <h2 className="text-2xl font-bold mb-1">Featured Movies</h2>
        </div>
          <div className="flex flex-wrap">
            {data.map((movie, index) => (
              <MovieCard
                key={movie.imdbID || index}
                movie={movie}
                viewType={viewType}
                isFeatured={true}
              />
            ))}
          </div>
        </div>
        {/* Movie Night Section */}
        <div>
        <div className="flex flex-col items-center justify-center gap-1 ml-4 mb-6">
          <div className="">
          <img src="/shuffle.png" alt="" className="w-14 h-14" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Movie Night</h2>
        </div>

          <div
            className={`flex flex-wrap ${
              viewType === "list" ? "flex-col" : ""
            }`}
          >
            {currentMovies.map((movie, index) => (
              <MovieCard
                key={movie.imdbID || index}
                movie={movie}
                viewType={viewType}
                isFeatured={false}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 my-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <img src="/previous.png" alt="" className="w-6 h-6" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              // Calculate the range of pages to show
              let start = Math.max(currentPage - 2, 1);
              let end = Math.min(start + 4, totalPages);

              // Adjust start if we're near the end
              if (end === totalPages) {
                start = Math.max(end - 4, 1);
              }

              // Only render if index is within our desired range
              if (index + 1 >= start && index + 1 <= end) {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#dc6352] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <img src="/next.png" alt="" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
