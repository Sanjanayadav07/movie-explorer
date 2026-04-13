import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition duration-300">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;