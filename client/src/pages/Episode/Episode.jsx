import React from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { tvShows } from '../../../tvs.js';

const Episode = () => {
    const { showId, seasonNum, episodeNum } = useParams();
    const navigate = useNavigate();
    
    const show = tvShows.find(s => s.id === parseInt(showId));
    const currentEpisode = parseInt(episodeNum);
    const totalEpisodes = 10; // Demo value, replace with actual episode count

    const handlePrevious = () => {
        if (currentEpisode > 1) {
            navigate(`/episode/${showId}/${seasonNum}/${currentEpisode - 1}`);
        }
    };

    const handleNext = () => {
        if (currentEpisode < totalEpisodes) {
            navigate(`/episode/${showId}/${seasonNum}/${currentEpisode + 1}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Video Player */}
            <div className="w-full aspect-video mb-8 bg-gray-900 rounded-lg overflow-hidden">
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    width="100%"
                    height="100%"
                    controls
                    playing
                />
            </div>

            {/* Episode Navigation */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={handlePrevious}
                    disabled={currentEpisode === 1}
                    className="px-6 py-2 bg-yellow-400 hover:bg-[#efc949] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous Episode
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentEpisode === totalEpisodes}
                    className="px-6 py-2 bg-yellow-400 hover:bg-[#efc949] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next Episode
                </button>
            </div>

            {/* Current Episode Info */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {show?.name} - Season {seasonNum}
                </h1>
                <p className="text-xl text-gray-700">
                    Episode {episodeNum}
                </p>
            </div>

            {/* Season Episodes List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">All Episodes - Season {seasonNum}</h2>
                <div className="grid gap-4">
                    {Array.from({ length: totalEpisodes }).map((_, index) => (
                        <Link
                            key={index}
                            to={`/episode/${showId}/${seasonNum}/${index + 1}`}
                            className={`p-4 rounded-lg transition-colors ${
                                currentEpisode === index + 1
                                    ? 'bg-yellow-400 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Episode {index + 1}</span>
                                {currentEpisode === index + 1 && (
                                    <span className="text-sm">Currently Playing</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Episode;
