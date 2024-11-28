import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../../components/movieCard/movieCard";
import TvShowCard from "../../components/tvShowCard/tvShowCard";
import { searchMoviesByQuery } from "../../utils/movieHelper";
import { searchTvByQuery } from "../../utils/tvHelper";

const SearchResult = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("movies");
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [filters, setFilters] = useState({
    sortBy: "vote_average.desc",
    voteCount: 100,
    year: new Date().getFullYear(),
    language: "en",
  });

  const movieQuery = useQuery({
    queryKey: ["searchMovies", searchQuery, currentPage],
    queryFn: async () => {
      const response = await searchMoviesByQuery(searchQuery, currentPage);
      return response.data;
    },
    enabled: Boolean(searchQuery) && activeTab === "movies",
  });

  const tvQuery = useQuery({
    queryKey: ["searchTv", searchQuery, currentPage, filters],
    queryFn: async () => {
      const response = await searchTvByQuery(searchQuery, currentPage);
      return response.data;
    },
    enabled: Boolean(searchQuery) && activeTab === "tv",
  });

  if (movieQuery.isLoading || tvQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (movieQuery.error || tvQuery.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Something went wrong
        </h2>
      </div>
    );
  }

  const currentResults =
    activeTab === "movies" ? movieQuery.data?.results : tvQuery.data?.results;

  const totalPages =
    activeTab === "movies"
      ? movieQuery.data?.total_pages
      : tvQuery.data?.total_pages;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: {searchQuery}
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "movies" ? "bg-yellow-400 text-white" : "bg-gray-200"
          }`}
        >
          Movies ({movieQuery.data?.total_results || 0})
        </button>
        <button
          onClick={() => setActiveTab("tv")}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "tv" ? "bg-yellow-400 text-white" : "bg-gray-200"
          }`}
        >
          TV Shows ({tvQuery.data?.total_results || 0})
        </button>
      </div>

      {!currentResults?.length ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">
            `No {activeTab === "movies" ? "movies" : "TV shows"} found for "
            {searchQuery}`
          </h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {activeTab === "movies" &&
              movieQuery.data?.results
                ?.filter(
                  (movie) =>
                    movie.poster_path && movie.overview && movie.vote_count > 0 && movie.release_date
                )
                .map((movie) => (
                  <div className="h-full" key={movie.id}>
                    <MovieCard
                      movie={movie}
                      viewType="grid"
                      className="h-full flex flex-col"
                    />
                  </div>
                ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {activeTab === "tv" &&
              tvQuery.data?.results
                ?.filter(
                  (show) =>
                    show.poster_path && show.overview && show.first_air_date
                )
                .map((show) => (
                  <div className="h-full" key={show.id}>
                    <TvShowCard
                      key={show.id}
                      show={show}
                      viewType="grid"
                      className="flex flex-col"
                    />
                  </div>
                ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <img src="/previous.png" alt="" className="w-6 h-6" />
              </button>

              <span className="mx-4">
                Page {currentPage} of {Math.min(totalPages, 500)}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.min(totalPages, 500))
                  )
                }
                disabled={currentPage === Math.min(totalPages, 500)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <img src="/next.png" alt="" className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
