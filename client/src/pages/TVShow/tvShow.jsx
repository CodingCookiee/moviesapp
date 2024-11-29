import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { getShowDetails } from "../../utils/tvHelper.js";

const TvShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState({});

  const {
    data: show,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tvshow", id],
    queryFn: async () => {
      const response = await getShowDetails(id);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <img
          src="/movie-error.png"
          alt="Not Found"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Show Not Available
        </h2>
        <button
          onClick={() => navigate("/tvshows")}
          className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Browse TV Shows
        </button>
      </div>
    );
  }

  const trailerVideo = show.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const watchProviders = show["watch/providers"]?.results?.US;

  const seasons =
    show.seasons?.filter((season) => season.season_number !== 0) || [];
  const genres = show.genres || [];
  const networks = show.networks || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Video Player Section */}
      {trailerVideo ? (
        <div className="w-full aspect-video mb-8 bg-gray-900 rounded-lg overflow-hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
            width="100%"
            height="100%"
            controls
          />
        </div>
      ) : (
        <div className="min-h-full mb-32 p-16 flex flex-col items-center justify-center">
          <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800 ">
            Trailer Not Available
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster Section */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={() =>
              navigate("/watch-providers", {
                state: {
                  providers: watchProviders,
                  movieTitle: show.name,
                },
              })
            }
            className="w-full mt-4 bg-yellow-400 hover:bg-[#efc949] text-white py-3 px-6 rounded-lg transition-colors"
          >
            Watch Now
          </button>
        </div>

        {/* Info Section */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{show.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center self-start gap-4">
                <div className="flex items-center bg-black/10 px-3 py-1 rounded">
                  <img src="/star.png" alt="rating" className="w-5 h-5 mr-2" />
                  <span className="text-yellow-400 font-bold">
                    {show.vote_average?.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600">{show.first_air_date}</span>
                <span className="text-gray-600">
                  {show.number_of_seasons} Seasons
                </span>
              </div>
              <div className="flex item-center self-start gap-2 flex-wrap">
                <span className="text-yellow-400 text-2xl font-bold mr-2.5">
                  |
                </span>
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="mt-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-700">{show.overview}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Created By</h2>
              <p className="text-gray-700">
                {show.created_by?.map((creator) => creator.name).join(", ")}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Networks</h2>
              <div className="flex gap-4">
                {networks?.map((network) => (
                  <img
                    key={network.id}
                    src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                    alt={network.name}
                    className="h-8 object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons Section */}
      <div className="mt-12 relative">
        <div className="flex items-center mb-6 gap-2.5">
          <span className="text-yellow-400 text-3xl font-extrabold ">|</span>
          <h2 className="text-2xl font-bold "> Seasons</h2>
        </div>
        <div className="flex flex-wrap gap-4 md:grid-cols-4">
          {seasons
            .filter((season) => season.season_number !== 0)
            .map((season) => (
              <div
                key={season.id}
                className="relative cursor-pointer"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, [season.id]: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, [season.id]: false }))
                }
                onClick={() =>
                  navigate(`/season/${show.id}/${season.season_number}`)
                }
              >
                <div className="">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                    alt={season.name}
                    className="w-48 h-[300px] object-cover rounded-lg shadow-md 
                  hover:shadow-[0_0_20px_10px_#efc949] transition-shadow duration-300"
                  />
                </div>
                {isHovered[season.id] && (
                  <div
                    className="absolute top-28 right-16  bg-opacity-50 rounded-lg flex 
                  items-center justify-center transition-all duration-300"
                  >
                    <img
                      src="/play-button.png"
                      alt="play"
                      className="w-14 h-14 transform hover:scale-150 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="mt-2 text-center self-center overflow-hidden max-w-[200px]">
                  <h3 className="font-semibold">{season.name}</h3>
                  <p className="text-sm text-gray-600">
                    {season.episode_count} Episodes
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TvShow;
