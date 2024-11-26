import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";

const MovieCard = ({ movie, viewType, isFeatured }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (currentUser) {
        try {
          const response = await newRequest.get(
            `/favorites/check/${movie.imdbID}`
          );
          setIsFavorite(response.data.isFavorite);
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkFavoriteStatus();
  }, [movie.imdbID, currentUser]);

  const cardClassName =
    viewType === "grid"
      ? "w-full sm:w-1/2 lg:w-1/4 p-4"
      : "w-3/5 h-2/3 self-center mb-4";

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const response = await newRequest.post("/favorites/toggle", {
        itemId: movie.imdbID,
        type: "movie",
      });
      setIsFavorite(response.data.isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className={cardClassName}>
      <div
        className="movie-card h-full border border-solid border-[rgb(228, 228, 228)] rounded-lg overflow-hidden shadow-md hover:shadow-[0_0_15px_rgba(239,201,73,0.5)] transition-shadow duration-300 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3] relative">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="absolute w-full h-full object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <img
                src="/play-button.png"
                alt="play"
                className="w-16 h-16 transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white transition-colors"
          >
            <img
              src={isFavorite ? "/favorite.png" : "/unfavorite.png"}
              alt="favorite"
              className="w-6 h-6 hover:scale-125 transition-transform duration-300"
            />
          </button>

          {/* Tags */}
          <div className="absolute top-2 left-2">
            {isFeatured ? (
              <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm">
                Featured
              </span>
            ) : (
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                HD
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-2 right-2">
            <div className="flex items-center bg-black/70 text-[#efc949] px-2 py-1 rounded">
              <img src="/star.png" alt="star" className="w-4 h-4 mr-1" />
              <span>{movie.imdbRating}</span>
            </div>
          </div>
        </div>

        <div className="info p-4">
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
