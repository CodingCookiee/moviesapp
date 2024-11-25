import React, { useState } from "react";
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, viewType, isFeatured }) => {
  const [isHovered, setIsHovered] = useState();
  const cardClassName =
    viewType === "grid" ? "w-full sm:w-1/2 lg:w-1/4 p-4" : "w-3/5 h-2/3 self-center mb-4 ";

  return (
    <Link to={`/movie/${movie.imdbID}`} className={cardClassName}>
      <div
        className={`movie-card border border-solid border-[rgb(228, 228, 228)] cursor-pointer rounded-lg 
        overflow-hidden shadow-md  relative hover:shadow-[0_0_20px_10px_#efc949] transition-shadow duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3] relative">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="absolute w-full h-full object-cover"
          />
          {/* Play Button Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300">
              <img
                src="/play-button.png"
                alt="play"
                className="w-20 h-20 transform hover:scale-150 transition-transform duration-300"
              />
            </div>
          )}
          {/* Tags */}
          <div className="absolute top-3 left-2">
            {isFeatured ? (
              <span className="bg-yellow-400 text-white px-5 py-2 rounded text-sm">
                Featured
              </span>
            ) : (
              <span className="bg-blue-500 text-white px-5 py-2 rounded text-sm">
                HD
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="absolute bottom-2 right-2 ">
            <div className="flex items-center bg-black/70 text-yellow-400 px-3 py-1 rounded">
              <img src="/star.png" alt="star" className="w-4 h-4 mr-1" />
              <span>{movie.imdbRating}</span>
            </div>
          </div>
        </div>
        </div>
        <div className="info">
        <div className="p-4 flex flex-col -gap-1 justify-between border-none shadow-none bg-transparent">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {movie.Title}
          </h3>
          <p className="text-gray-600 mb-2 line-clamp-1">{movie.Genre}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">$9.99</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
