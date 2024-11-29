import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WatchProviders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { providers, movieTitle } = location.state || {};

  const getProviderLink = (provider) => {
    return provider.link || providers.link;
  };

  if (!providers) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src="/movie-error.png" alt="Error" className="w-32 h-32 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          No Watch Providers Available
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Watch {movieTitle}</h1>

      <div className="grid gap-8">
        {providers.flatrate && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Stream</h2>
            <div className="flex flex-wrap gap-4">
              {providers.flatrate.map((provider) => (
                <a
                  key={provider.provider_id}
                  href={getProviderLink(provider)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer flex flex-col items-center hover:transform hover:scale-105 transition-transform"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-16 h-16 rounded-lg shadow-md"
                  />
                  <span className="mt-2 text-sm text-center">
                    {provider.provider_name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {providers.rent && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Rent</h2>
            <div className="flex flex-wrap gap-4">
              {providers.rent.map((provider) => (
                <a
                  key={provider.provider_id}
                  href={getProviderLink(provider)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:transform hover:scale-105 transition-transform"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-16 h-16 rounded-lg shadow-md"
                  />
                  <span className="mt-2 text-sm text-center">
                    {provider.provider_name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {providers.buy && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Buy</h2>
            <div className="flex flex-wrap gap-4">
              {providers.buy.map((provider) => (
                <a
                  key={provider.provider_id}
                  href={getProviderLink(provider)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center hover:transform hover:scale-105 transition-transform"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-16 h-16 rounded-lg shadow-md"
                  />
                  <span className="mt-2 text-sm text-center">
                    {provider.provider_name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {providers.link && (
          <a
            href={providers.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-xs mx-auto mt-8 bg-yellow-400 hover:bg-[#efc949] text-white py-3 px-6 rounded-lg text-center transition-colors"
          >
            Visit Streaming Page
          </a>
        )}
      </div>
    </div>
  );
};

export default WatchProviders;
