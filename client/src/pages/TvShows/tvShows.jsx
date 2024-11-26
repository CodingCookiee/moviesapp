import React, { useState } from "react";
import TvShowCard from "../../components/tvShowCard/tvShowCard";
import { tvShows } from "../../../tvs.js";

const TvShows = () => {
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const validShows = tvShows || [];
  const featuredShows = tvShows.slice(0, 12);
  const remainingShows = tvShows.slice(12);

  // Calculate pagination for TV Shows section
  const indexOfLastShow = currentPage * 16;
  const indexOfFirstShow = indexOfLastShow - 16;
  const currentShows = remainingShows.slice(indexOfFirstShow, indexOfLastShow);
  const totalPages = Math.max(1, Math.ceil(remainingShows.length / 16));

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header and View Toggle sections remain the same */}

        {/* Featured TV Shows */}
        <div>
          <div className="flex items-center gap-2.5 ml-4 mb-6">
            <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
            <h2 className="text-2xl font-bold">Featured TV Shows</h2>
          </div>
          <div
            className={`flex flex-wrap ${
              viewType === "list" ? "flex-col" : ""
            }`}
          >
           {featuredShows.length > 0 ? (
            featuredShows.map((show) => (
              <TvShowCard
                key={show.id}
                show={show}
                viewType={viewType}
                isFeatured={true}
              />
            ))
           ) : ( <div className="w-full text-center py-8">No shows available</div> )}
          </div>
        </div>

        {/* Regular TV Shows with Pagination */}
        <div className="mt-12">
          <div className="flex items-center gap-2.5 ml-4 mb-6">
            <div className="h-[40px] bg-yellow-400 w-[10px]"></div>
            <h2 className="text-2xl font-bold">All TV Shows</h2>
          </div>
          <div
            className={`flex flex-wrap ${
              viewType === "list" ? "flex-col" : ""
            }`}
          >
            {currentShows && currentShows.length > 0 ? (
              currentShows.map((show) => (
                <TvShowCard
                  key={show.id}
                  show={show}
                  viewType={viewType}
                  isFeatured={false}
                />
              ))
            ) : (
              <div className="w-full text-center py-8 text-gray-500">
                No more shows to display
              </div>
            )}
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
export default TvShows;
