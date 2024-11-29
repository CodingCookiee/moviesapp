import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { getShowDetails, getSeasonDetails } from "../../utils/tvHelper.js";

const Season = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [showEpisodes, setShowEpisodes] = useState(false);

  const { data: show } = useQuery({
    queryKey: ["tvshow", id],
    queryFn: () => getShowDetails(id),
  });

  // Update season queries
  const {
    isLoading,
    error,
    data: seasonDetails,
  } = useQuery({
    queryKey: ["season", id, seasonNumber],
    queryFn: async () => {
      const response = await getSeasonDetails(id, seasonNumber);
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

  if (error || !show || !seasonDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Season Not Available
        </h2>
        <button
          onClick={() => navigate(`/tvshow/${id}`)}
          className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Back to Show
        </button>
      </div>
    );
  }

  const trailerVideo = seasonDetails.videos?.results?.find(
    (video) =>
      video.type === "Recap" ||
      (video.type === "Teaser" && video.site === "YouTube"),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
            Preview Not Available
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Season Info Section */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`}
            alt={seasonDetails.name}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">{seasonDetails.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{seasonDetails.air_date}</span>
              <span>•</span>
              <span className="text-gray-600">
                {seasonDetails.episodes?.length} Episodes
              </span>
            </div>
            <p className="text-gray-700">{seasonDetails.overview}</p>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              onClick={() => setShowEpisodes(!showEpisodes)}
              className="cursor-pointer bg-gray-100 hover:bg-yellow-400 transition-colors p-4 flex justify-between items-center"
            >
              <h2 className="text-2xl font-bold">Episodes</h2>
              <span className="transform transition-transform duration-200">
                {showEpisodes ? (
                  <img src="/down-arrow.png" alt="" className="w-10 h-10" />
                ) : (
                  <img src="/right-arrow.png" alt="" className="w-10 h-10" />
                )}
              </span>
            </div>

            {showEpisodes && (
              <div className="p-4 space-y-6" cursor-pointer>
                {seasonDetails.episodes?.map((episode) => (
                  <div
                    key={episode.id}
                    className="border-b last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex gap-4">
                      {episode.still_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                          alt={episode.name}
                          className="w-48 h-27 object-cover rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {episode.episode_number}. {episode.name}
                        </h3>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-gray-600">
                            {episode.air_date}
                          </span>
                          {episode.runtime && (
                            <span className="text-gray-600">
                              {episode.runtime} min
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700">{episode.overview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Season;
