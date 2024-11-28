import React, { useState } from "react";
import TvShowCard from "../../components/tvShowCard/tvShowCard";
import { useQuery } from "@tanstack/react-query";
import {
  searchFeaturedShows,
  searchShows,
  getShowDetails,
} from "../../utils/tvHelper.js";

const TvShows = () => {
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const MAX_PAGES = 30;

  const { isLoading  : featuredLoading, error: featuredError,data: featuredShows } = useQuery({
    queryKey: ['featuredShows'],
    queryFn: async () => {
      const response = await searchFeaturedShows();
      return response.data.results || [];
    }
  });
  
  const { isLoading : allShowsLoading, error: allShowsError, data: allShowsData } = useQuery({
    queryKey: ['allShows', currentPage],
    queryFn: async () => {
      const response = await searchShows(currentPage);
      return response.data;
    }
  });
  

  if (featuredLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (featuredError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-600">{featuredError.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header section */}
        <div className="inline-flex items-center justify-center w-full mt-7">
          <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="bg-white font-medium text-5xl text-gray-700">TV Shows</h1>
          </div>
        </div>

        {/* View toggle */}
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

        {/* Featured TV Shows */}
        <div>
          <div className="flex items-center gap-2.5 ml-4 mb-6">
            <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
            <h2 className="text-2xl font-bold">Featured TV Shows</h2>
          </div>
          <div className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}>
            {featuredShows?.map((show) => (
              <TvShowCard
                key={show.id}
                show={show}
                viewType={viewType}
                isFeatured={true}
              />
            ))}
          </div>
        </div>

        {/* All TV Shows */}
        <div className="mt-12">
          <div className="flex items-center gap-2.5 ml-4 mb-6">
            <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
            <h2 className="text-2xl font-bold">All TV Shows</h2>
          </div>
          
          {allShowsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : allShowsError ? (
            <div className="text-center py-8 text-red-500">
              Error loading shows: {allShowsError.message}
            </div>
          ) : (
            <>
              <div className={`flex flex-wrap ${viewType === "list" ? "flex-col" : ""}`}>
                {allShowsData?.shows?.map((show) => (
                  <TvShowCard
                    key={show.id}
                    show={show}
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

                {Array.from({ length: Math.min(allShowsData?.totalPages || 0, MAX_PAGES) }).map((_, index) => {
                  let start = Math.max(currentPage - 2, 1);
                  let end = Math.min(start + 4, allShowsData?.totalPages || 0);
                  if (end === allShowsData?.totalPages) {
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
                  onClick={() => setCurrentPage((prev) => 
                    Math.min(prev + 1, Math.min(allShowsData?.totalPages || 1, MAX_PAGES))
                  )}
                  disabled={currentPage === Math.min(allShowsData?.totalPages || 1, MAX_PAGES)}
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


export default TvShows;
