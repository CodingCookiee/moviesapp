import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../utils/movieHelper.js";
import ReactPlayer from "react-player";

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await getMovieDetails(id);
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

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <img
          src="/movie-error.png"
          alt="Not Found"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Movie Not Available
        </h2>
        <button
          onClick={() => navigate("/movies")}
          className="bg-yellow-400 hover:bg-[#efc949] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  const trailerVideo = movie?.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Video Player Section */}
      {trailerVideo ? (
        <div className="w-full aspect-video mb-8 bg-gray-900 rounded-xl overflow-hidden">
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
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={() =>
              navigate("/watch-providers", {
                state: {
                  providers: movie["watch/providers"]?.results?.US,
                  movieTitle: movie.title,
                },
              })
            }
            className="w-full mt-4 bg-yellow-400 hover:bg-[#efc949] text-white py-3 px-6 rounded-lg transition-colors"
          >
            Watch Now
          </button>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-black/10 px-3 py-1 rounded">
              <img src="/star.png" alt="rating" className="w-5 h-5 mr-2" />
              <span className="text-yellow-400 font-bold">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="text-gray-600">{movie.runtime} min</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-700">{movie.overview}</p>
            </div>

            {movie.credits?.crew && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Director</h2>
                <p className="text-gray-700">
                  {movie.credits.crew
                    .filter((person) => person.job === "Director")
                    .map((director) => director.name)
                    .join(", ")}
                </p>
              </div>
            )}

            {movie.credits?.cast && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Cast</h2>
                <p className="text-gray-700">
                  {movie.credits.cast
                    .slice(0, 5)
                    .map((actor) => actor.name)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-[50px] shadow-lg border-[#e5e5e5]" />

      <div className="rating">
        <div className="flex items-center gap-24 ml-4 mb-6">
          <h1 className="text-lg font-light">IMDb Rating: </h1>
          <div className="flex items-center bg-black/10 px-3 py-1 rounded">
            <img src="/star.png" alt="rating" className="w-5 h-5 mr-2" />
            <span className="text-yellow-400 font-bold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-12 ml-4 mb-6">
          <h1 className="text-lg font-light ">Vote Count: </h1>
          <div className="flex items-center bg-black/10 px-3 py-1 rounded ml-14">
            <span className="text-slate-600 font-bold ">
              {movie.vote_count}
            </span>
            <span className="text-slate-600 font-bold ml-2"> votes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;
