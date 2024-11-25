import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, viewType }) => {
    const cardClassName = viewType === 'grid' 
        ? 'w-full sm:w-1/2 lg:w-1/4 p-4' 
        : 'w-full mb-4';

    return (
        <div className={`${cardClassName}`}>
            <div className='movie-card h-full border border-solid border-[rgb(228, 228, 228)] cursor-pointer
            rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-[#efc949] transition-shadow duration-300'>
                <div className='aspect-[2/3] relative'>
                    <img 
                        src={movie.Poster} 
                        alt={movie.Title} 
                        className='absolute w-full h-full object-cover'
                    />
                </div>
                <div className='info p-4 flex flex-col justify-between'>
                    <h3 className='text-lg font-semibold mb-2 line-clamp-2'>{movie.Title}</h3>
                    <p className='text-gray-600 mb-2 line-clamp-1'>{movie.Genre}</p>
                    <div className='flex justify-between items-center'>
                        <span className='text-lg font-bold'>$9.99</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MovieCard;
