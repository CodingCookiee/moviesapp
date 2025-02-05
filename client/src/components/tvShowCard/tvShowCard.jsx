import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getShowDetails } from "../../utils/tvHelper.js";

const TvShowCard = ({ show, viewType, isFeatured }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const { data: showDetails } = useQuery({
    queryKey: ["showDetails", show.id],
    queryFn: async () => {
      const response = await getShowDetails(show.id);
      return response.data;
    },
  });

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (currentUser) {
        try {
          const response = await newRequest.get(`/favorites/check/${show.id}`);
          setIsFavorite(response.data.isFavorite);
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkFavoriteStatus();
  }, [show.id, currentUser]);

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
        itemId: show.id,
        type: "show",
      });
      setIsFavorite(response.data.isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link to={`/tvshow/${show.id}`} className={cardClassName}>
      <div
        className="tv-card h-full border border-solid border-[rgb(228, 228, 228)] cursor-pointer rounded-lg 
        overflow-hidden shadow-md relative hover:shadow-[0_0_20px_10px_#efc949] transition-shadow duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3] relative">
          <img
            src={`${imageBaseUrl}${show.poster_path}`}
            alt={show.name}
            className="absolute w-full h-full object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <img
                src="/play-button.png"
                alt="play"
                className="w-20 h-20 transform hover:scale-150 transition-transform duration-300"
              />
            </div>
          )}

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

          <div className="absolute bottom-2 right-2">
            <div className="flex items-center bg-black/70 text-[#efc949] px-2 py-1 rounded">
              <img src="/star.png" alt="star" className="w-4 h-4 mr-1" />
              <span>{show.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="info p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {show.name}
          </h3>
          <p className="text-gray-600 mb-2 line-clamp-1">
            {showDetails?.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              {new Date(show.first_air_date).getFullYear()}
            </span>
            <span className="text-gray-600">
              {showDetails?.number_of_seasons}{" "}
              {showDetails?.number_of_seasons === 1 ? "Season" : "Seasons"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvShowCard;
