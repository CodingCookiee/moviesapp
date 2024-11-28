import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getShowDetails, getSeasonDetails } from "../../utils/tvApi";

const Season = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [activeEpisodes, setActiveEpisodes] = useState({});

  const { data: show } = useQuery({
    queryKey: ['tvshow', id],
    queryFn: () => getShowDetails(id)
  });

  const { data: seasonDetails, isLoading, error } = useQuery({
    queryKey: ['season', id, seasonNumber],
    queryFn: () => getSeasonDetails(id, seasonNumber),
    enabled: !!show
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
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Season Not Available</h2>
        <button
          onClick={() => navigate(`/tvshow/${id}`)}
          className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Back to Show
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
              <span className="text-gray-600">{seasonDetails.episodes?.length} Episodes</span>
            </div>
            <p className="text-gray-700">{seasonDetails.overview}</p>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Episodes</h2>
          <div className="space-y-4">
            {seasonDetails.episodes?.map((episode) => (
              <div key={episode.id} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setActiveEpisodes(prev => ({
                    ...prev,
                    [episode.episode_number]: !prev[episode.episode_number]
                  }))}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt={episode.name}
                      className="w-32 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {episode.episode_number}. {episode.name}
                      </h3>
                      <p className="text-sm text-gray-600">{episode.air_date}</p>
                    </div>
                  </div>
                  <span>{activeEpisodes[episode.episode_number] ? "▼" : "▶"}</span>
                </button>
                
                {activeEpisodes[episode.episode_number] && (
                  <div className="p-4 border-t">
                    <p className="text-gray-700">{episode.overview}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center bg-black/10 px-3 py-1 rounded">
                        <img src="/star.png" alt="rating" className="w-4 h-4 mr-1" />
                        <span className="text-yellow-400 font-bold">
                          {episode.vote_average?.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-600">{episode.runtime} min</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Season;
