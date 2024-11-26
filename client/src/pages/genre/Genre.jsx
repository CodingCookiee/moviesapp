import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../../components/movieCard/movieCard";
import { movies } from "../../../data.js";

const Genre = () => {
    const { genreName } = useParams();
    const [viewType, setViewType] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();


    // Filter movies by genre
    const genreMovies = movies.filter(movie => 
        movie.Genre.toLowerCase().includes(genreName.toLowerCase())
    );

    if (!genreMovies || genreMovies.length === 0) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <img
              src="/movie-error.png"
              alt="Not Found"
              className="w-32 h-32 mb-6"
            />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              No Movies Available in this Genre
            </h2>
            <button
              onClick={() => navigate("/movies")}
              className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Browse Movies
            </button>
          </div>
        );
      }

    // Pagination
    const moviesPerPage = 20;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = genreMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(genreMovies.length / moviesPerPage);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                {/* Genre Title */}
                <div className="inline-flex items-center justify-center w-full mt-7">
                    <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded" />
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
                        <h1 className="bg-white font-medium text-5xl text-gray-700 capitalize">
                            {genreName}
                        </h1>
                    </div>
                </div>

                {/* View Toggle */}
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

                {/* Movies Grid */}
                <div className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}>
                    {currentMovies.map((movie, index) => (
                        <MovieCard
                            key={movie.imdbID || index}
                            movie={movie}
                            viewType={viewType}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 my-8">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded transition-colors ${
                                currentPage === index + 1
                                    ? "bg-yellow-400 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Genre;
