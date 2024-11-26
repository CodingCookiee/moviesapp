import React, { useState } from "react";
import MovieCard from "../../components/movieCard/movieCard";
import { movies } from "../../../data.js";

const Top50 = () => {
    const [viewType, setViewType] = useState("grid");

    // Sort movies by IMDB rating and votes
    const top50Movies = movies
        .sort((a, b) => {
            // First compare by IMDB rating
            const ratingDiff = parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
            if (ratingDiff !== 0) return ratingDiff;
            
            // If ratings are equal, compare by number of votes
            return parseInt(b.imdbVotes.replace(/,/g, '')) - parseInt(a.imdbVotes.replace(/,/g, ''));
        })
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
                    {top50Movies.map((movie, index) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            viewType={viewType}
                            isFeatured={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Top50;
