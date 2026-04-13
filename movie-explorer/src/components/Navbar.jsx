import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🎬 Movie Explorer</h1>

      <button
        onClick={() => setDark(!dark)}
        className="bg-gray-700 px-3 py-1 rounded"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default Navbar;