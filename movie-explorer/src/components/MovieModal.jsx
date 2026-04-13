import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieModal = ({ movie, onClose }) => {
    const [videoKey, setVideoKey] = useState(null);

    useEffect(() => {
        if (movie) {
            fetchTrailer();
        }
    }, [movie]);

    const fetchTrailer = async () => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
            );

            const trailer = res.data.results.find(
                (vid) => vid.type === "Trailer"
            );

            if (trailer) {
                setVideoKey(trailer.key);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!movie) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded w-11/12 md:w-2/3 relative max-h-[90vh] overflow-y-auto">

                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-xl"
                    onClick={onClose}
                >
                    ❌
                </button>

                <div className="flex flex-col md:flex-row gap-4">

                    {/* Poster */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-full md:w-1/3"
                    />

                    <div>
                        <h2 className="text-2xl font-bold">{movie.title}</h2>

                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {movie.overview}
                        </p>

                        <p className="mt-2">⭐ {movie.vote_average}</p>
                    </div>
                </div>

                {/* 🎬 TRAILER SECTION */}
                <div className="mt-6">
                    {videoKey ? (
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${videoKey}`}
                            title="Trailer"
                            allowFullScreen
                        />
                    ) : (
                        <p className="text-center text-gray-500">
                            No trailer available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
