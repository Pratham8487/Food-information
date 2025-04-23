import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Leaf, Menu, X } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <nav className=" shadow-sm sticky top-0 z-50 bg-[#F1F5F9]">
      <div className="w-full mx-auto flex items-center justify-between lg:px-8 py-4 sm:px-8">
        <div className="flex items-center lg:space-x-4">
          <Leaf
            className="text-[#4292C6] mr-2 group-hover:text-[#2171B5] transition-colors"
            size={24}
          />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-[#08519C] ">
            NutriFind
          </span>

          <div className="relative hidden lg:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  className=" rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#4292C6]"
                />
              )}

              <button
                type="submit"
                className="ml-2 hover:text-gray-200 bg-[#08519C] text-white p-2 rounded-full hover:bg-[#08306B] transition-colors"
              >
                <Search size={20} onClick={handleSearchOpen} />
              </button>
            </form>
          </div>
        </div>

        <button
          className="lg:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden lg:flex items-center space-x-10">
          <Link to="/" className="block lg:inline-block px-4 py-2 lg:p-0">
            <span
              className={`text-gray-600 text-lg transition-all duration-300 ${
                path === "/"
                  ? "text-[#4292C6] font-bold underline underline-offset-4"
                  : "text-gray-600 hover:text-[#4292C6] hover:underline underline-offset-4 decoration-2"
              }`}
            >
              Home
            </span>
          </Link>
          <Link to="/browse" className="block lg:inline-block px-4 py-2 lg:p-0">
            <span
              className={`text-gray-600 text-lg transition-all duration-300 ${
                path === "/browse"
                  ? "text-[#4292C6] font-bold underline underline-offset-4"
                  : "text-gray-600 hover:text-[#4292C6] hover:underline underline-offset-4 decoration-2"
              }`}
            >
              Browse
            </span>
          </Link>
          <Link
            to="/favorites"
            className="block lg:inline-block px-4 py-2 lg:p-0"
          >
            <span
              className={`text-gray-600 text-lg transition-all duration-300 ${
                path === "/favorites"
                  ? "text-[#4292C6] font-bold underline underline-offset-4"
                  : "text-gray-600 hover:text-[#4292C6] hover:underline underline-offset-4 decoration-2"
              }`}
            >
              Favorites
            </span>
          </Link>
          <Link to="/about" className="block lg:inline-block px-4 py-2 lg:p-0">
            <span
              className={`text-gray-600 text-lg transition-all duration-300 ${
                path === "/about"
                  ? "text-[#4292C6] font-bold underline underline-offset-4"
                  : "text-gray-600 hover:text-[#4292C6] hover:underline underline-offset-4 decoration-2"
              }`}
            >
              About
            </span>
          </Link>
        </div>
      </div>
      <div className="px-10 py-2 lg:hidden">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            autoFocus
            className=" rounded-lg py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="ml-2 hover:text-gray-200 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <Search size={20} onClick={handleSearchOpen} />
          </button>
        </form>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md py-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="px-8 py-2 text-gray-600 text-lg font-semibold hover:bg-green-50 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="px-8 py-2 text-gray-600 text-lg font-semibold hover:bg-green-50 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/favorites"
              className="px-8 py-2 text-gray-600 text-lg font-semibold hover:bg-green-50 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              to="/about"
              className="px-8 py-2 text-gray-600 text-lg font-semibold hover:bg-green-50 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
