import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../../components/movieCard/movieCard";
import { useQuery } from "@tanstack/react-query";
import { searchMoviesByGenre, getGenres } from "../../utils/movieHelper.js";

const Genre = () => {
  const { genreId } = useParams();
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const MAX_PAGES = 30;

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await getGenres();
      const data = await response.json();
      return data;
    },
  });

  const currentGenre = genres?.find((genre) => genre.id === parseInt(genreId));
  console.log("Current Genre:", currentGenre);
  const {
    isLoading,
    error,
    data: moviesData,
  } = useQuery({
    queryKey: ["genreMovies", genreId, currentPage],
    queryFn: async () => {
      const response = await searchMoviesByGenre(genreId, currentPage);
      return {
        movies: response?.data?.results,
        totalPages: Math.min(response?.data?.total_pages, MAX_PAGES),
      };
    },
    enabled: Boolean(genreId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Something went wrong
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

  if (!moviesData?.movies?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img
          src="/movie-error.png"
          alt="Not Found"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          No Movies Available in {currentGenre?.name || "this genre"}
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="inline-flex items-center justify-center w-full mt-7">
          <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="bg-white font-medium text-5xl text-gray-700 capitalize">
              {currentGenre?.name || "Genre"}
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

        {/* All Movies */}
        <div>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading movies: {error.message}
            </div>
          ) : (
            <>
              <div
                className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}
              >
                {moviesData?.movies?.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={{
                      id: movie.id,
                      title: movie.title,
                      poster_path: movie.poster_path,
                      vote_average: movie.vote_average,
                      overview: movie.overview,
                      release_date: movie.release_date,
                      genre_ids: movie.genre_ids,
                    }}
                    viewType={viewType}
                    isFeatured={false}
                  />
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 my-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  <img src="/previous.png" alt="" className="w-6 h-6" />
                </button>

                {Array.from({
                  length: Math.min(moviesData?.totalPages || 0, MAX_PAGES),
                }).map((_, index) => {
                  let start = Math.max(currentPage - 2, 1);
                  let end = Math.min(start + 4, moviesData?.totalPages || 0);
                  if (end === moviesData?.totalPages) {
                    start = Math.max(end - 4, 1);
                  }
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
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.min(moviesData?.totalPages || 1, MAX_PAGES),
                      ),
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.min(moviesData?.totalPages || 1, MAX_PAGES)
                  }
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  <img src="/next.png" alt="" className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Genre;
