import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Error from "../components/Error";
import MovieModal from "../components/MovieModal";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("popular");

  // Fetch movies
  const getMovies = async (query = "popular", pageNum = 1) => {
    try {
      setLoading(true);
      setError(false);

      const data = await fetchMovies(query, pageNum);

      if (pageNum === 1) {
        setMovies(data);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }

      setCurrentQuery(query);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    getMovies("popular", 1);
  }, []);

  return (
    <div className="px-4 md:px-8">

      {/* 🔍 Search */}
      <SearchBar
        onSearch={(q) => {
          setPage(1);
          getMovies(q, 1);
        }}
      />

      {/* 🎭 Categories */}
      <div className="flex gap-3 flex-wrap my-4 justify-center">
        {["popular", "top_rated", "upcoming"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setPage(1);
              getMovies(cat, 1);
            }}
            className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded hover:scale-105 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {error && <Error />}

      {/* Movies Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={setSelectedMovie}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No movies found
              </p>
            )}
          </div>

          {/* 📄 Load More Button */}
          {movies.length > 0 && (
            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                getMovies(currentQuery, nextPage);
              }}
              className="block mx-auto mb-10 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
            >
              Load More
            </button>
          )}
        </>
      )}

      {/* 🎬 Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default Home;