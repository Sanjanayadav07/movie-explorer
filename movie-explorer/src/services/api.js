import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query = "popular", page = 1) => {
  try {
    let url = "";

    // 🎭 Categories
    if (["popular", "top_rated", "upcoming"].includes(query)) {
      url = `${BASE_URL}/movie/${query}?api_key=${API_KEY}&page=${page}`;
    }
    // 🔍 Search
    else {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    }

    const res = await axios.get(url);
    return res.data.results;
  } catch (error) {
    throw error;
  }
};
