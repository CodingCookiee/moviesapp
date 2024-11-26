import React from 'react';
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const Episode = () => {
    const { showId, seasonNum, episodeNum } = useParams();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Video Player */}
            <div className="w-full aspect-video mb-8 bg-gray-900 rounded-lg overflow-hidden">
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    width="100%"
                    height="100%"
                    controls
                />
            </div>

            {/* Episode Details */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">
                    Episode {episodeNum}
                </h1>
                <p className="text-gray-700">
                    Season {seasonNum} Episode {episodeNum}
                </p>
            </div>
        </div>
    );
}

export default Episode;
