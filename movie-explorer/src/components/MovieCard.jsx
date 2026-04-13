import { useEffect, useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFav(saved.some((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleFav = (e) => {
    e.stopPropagation();

    let saved = JSON.parse(localStorage.getItem("favorites")) || [];

    if (fav) {
      saved = saved.filter((m) => m.id !== movie.id);
    } else {
      // 🔥 prevent duplicate
      if (!saved.some((m) => m.id === movie.id)) {
        saved.push(movie);
      }
    }

    localStorage.setItem("favorites", JSON.stringify(saved));
    setFav(!fav);
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="relative cursor-pointer group rounded-xl overflow-hidden shadow-lg"
    >
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="w-full h-[350px] object-cover transform group-hover:scale-110 transition duration-300"
      />

      {/* ❤️ Favorite Button */}
      <button
        onClick={toggleFav}
        className="absolute top-2 right-2 text-2xl z-10"
      >
        {fav ? "❤️" : "🤍"}
      </button>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
        <h2 className="text-white font-bold text-lg">
          {movie.title}
        </h2>

        <p className="text-gray-300 text-sm">
          ⭐ {movie.vote_average}
        </p>

        <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded">
          ▶ Watch Trailer
        </button>
      </div>
    </div>
  );
};

export default MovieCard;