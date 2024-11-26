const MovieCard = ({ movie, viewType, isFeatured }) => {
    const cardClassName = viewType === 'grid' 
        ? 'w-full sm:w-1/2 lg:w-1/4 p-4' 
        : 'w-full mb-4';

    return (
        <div className={cardClassName}>
            <div className='movie-card h-full border border-solid border-[rgb(228, 228, 228)] rounded-lg overflow-hidden shadow-md hover:shadow-xl relative'>
                <div className='aspect-[2/3] relative'>
                    <img 
                        src={movie.Poster} 
                        alt={movie.Title} 
                        className='absolute w-full h-full object-cover'
                    />
                    {/* Tags */}
                    <div className='absolute top-3 left-2'>
                        {isFeatured ? (
                            <span className='bg-[#efc949] text-white px-5 py-2 rounded text-sm'>
                                Featured
                            </span>
                        ) : (
                            <span className='bg-blue-500 text-white px-5 py-2 rounded text-sm'>
                                HD
                            </span>
                        )}
                    </div>
                    {/* Rating */}
                    <div className='absolute bottom-2 right-2'>
                        <div className='flex items-center bg-black/70 text-[#efc949] px-3 py-1 rounded'>
                            <img src="/star.png" alt="star" className='w-4 h-4 mr-1'/>
                            <span>{movie.imdbRating}</span>
                        </div>
                    </div>
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