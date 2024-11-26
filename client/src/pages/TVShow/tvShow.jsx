import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { tvShows } from "../../../tvs.js";

const TvShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeSeasons, setActiveSeasons] = useState({});

  const show = tvShows.find((s) => s.id === parseInt(id));

  if (!show) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <img
          src="/movie-error.png"
          alt="Not Found"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Oops! Show Not Available
        </h2>
        <p className="text-gray-600 mb-8">
          Let's find you something else to watch!
        </p>
        <button
          onClick={() => navigate("/tvshows")}
          className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Browse TV Shows
        </button>
      </div>
    );
  }

  const trailerUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Video Player Section */}
      <div className="w-full aspect-video mb-8 bg-gray-900 rounded-lg overflow-hidden">
        {trailerUrl ? (
          <ReactPlayer
            url={trailerUrl}
            width="100%"
            height="100%"
            controls
            playing
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <span>Preview not available</span>
          </div>
        )}
      </div>

      {/* Show Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full rounded-lg shadow-lg"
          />
          <button className="w-full mt-4 bg-yellow-400 hover:bg-[#efc949]
           text-white py-3 px-6 rounded-lg transition-colors"
           onClick={() => navigate(`/episode/${show.id}/1/1`)}
           >
            Watch Now
          </button>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{show.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center gap-5">
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
              <div className="flex item-center justify-center gap-2 flex-wrap">
                <span className="text-yellow-400 text-2xl font-bold mr-2.5">
                  |
                </span>
                {show.genres.map((genre) => (
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
              <h2 className="text-xl font-semibold mb-2">Original Language</h2>
              <p className="text-gray-700">
                {show.original_language?.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-[50px] mx-0 shadow-lg h-0 border border-solid border-[#e5e5e5]" />

      {/* Seasons Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Seasons</h2>
        {Array.from({ length: show.number_of_seasons }).map((_, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() =>
                setActiveSeasons((prev) => ({
                  ...prev,
                  [index + 1]: !prev[index + 1],
                }))
              }
              className="w-full bg-gray-300 p-4 rounded-lg flex justify-between items-center hover:bg-yellow-400"
            >
              <span>Season {index + 1}</span>
              <span className="">{activeSeasons[index + 1] ? <img src="/down-arrow.png" alt='' className="w-10 h-10"/> :  <img src="/right-arrow.png" alt='' className="w-10 h-10"/>}</span>
            </button>

            {activeSeasons[index + 1] && (
              <div className="mt-2 ml-4">
                {Array.from({ length: 10 }).map((_, episodeIndex) => (
                  <Link
                    key={episodeIndex}
                    to={`/episode/${show.id}/${index + 1}/${episodeIndex + 1}`}
                    className="block p-2 hover:bg-yellow-400 rounded"
                  >
                    Episode {episodeIndex + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShow;
