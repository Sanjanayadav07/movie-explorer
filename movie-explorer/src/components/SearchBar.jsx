import { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(input || "popular");
    }, 500);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-3/4 md:w-1/2 p-3 border rounded-lg shadow 
bg-white text-black 
dark:bg-gray-800 dark:text-white 
border-gray-300 dark:border-gray-600 
placeholder-gray-500 dark:placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;