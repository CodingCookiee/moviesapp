import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { movies } from "../../../data.js";

const Movie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = movies.find((m) => m.imdbID === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <img
          src="/movie-error.png"
          alt="Not Found"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Oops! Movie Not Available
        </h2>
        <p className="text-gray-600 mb-8">
          This movie has left the theater. Let's find you something else!
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Browse Movies
        </button>
      </div>
    );
  }
  // Placeholder trailer URL - replace with actual movie trailer
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

      {/* Movie Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full rounded-lg shadow-lg"
          />
          <button className="w-full mt-4 bg-yellow-400 hover:bg-[#efc949] text-white py-3 px-6 rounded-lg transition-colors">
            Watch Now
          </button>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>

          <div className="flex items-center gap-4 mb-6">
          <div className="flex flex-col items-center gap-5">
          <div className="flex items-center self-start gap-4">
          <div className="flex items-center bg-black/10 px-3 py-1 rounded">
              <img src="/star.png" alt="rating" className="w-5 h-5 mr-2" />
              <span className="text-yellow-400 font-bold">
                {movie.imdbRating}
              </span>
            </div>
            <span className="text-gray-600">{movie.Year}</span>
            <span className="text-gray-600">{movie.Runtime} </span>
          </div>
            <div className="flex item-center self-start gap-2 flex-wrap">
              <span className="text-yellow-400 text-2xl font-bold mr-2.5">
                |{" "}
              </span>
              {movie.Genre.split(", ").map((genre, index) => (
                <span
                  key={index}
                  className="mt-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-gray-700">{movie.Plot}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p className="text-gray-700">{movie.Director}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <p className="text-gray-700">{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-[50px] mx-0 shadow-lg h-0 border border-solid border-[#e5e5e5]" />
      <div className="rating ">
      <div className="flex items-center gap-24 ml-4 mb-6">
      <h1 className="text-lg font-light ">IMDb: </h1>
      <div className="flex items-center bg-black/10 px-3 py-1 rounded">
          <img src="/star.png" alt="rating" className="w-5 h-5 mr-2" />
          <span className="text-yellow-400 font-bold">{movie.imdbRating}</span>
        </div>
      </div>
      <div className="flex items-center gap-12 ml-4 mb-6">
      <h1 className="text-lg font-light ">IMDb Votes: </h1>
      <div className="flex items-center bg-black/10 px-3 py-1 rounded">
          <span className="text-slate-600 font-bold">{movie.imdbVotes}</span>
          <span className="text-slate-600 font-bold ml-2"> votes</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Movie;
