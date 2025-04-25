import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className=" shadow-sm sticky top-0 z-50 bg-[#F1F5F9]">
      <div className="w-full mx-auto flex items-center justify-between lg:px-8 p-4 sm:px-8">
        <div className="flex items-center lg:space-x-4">
          <Leaf
            className="text-[#4292C6] mr-2 group-hover:text-[#2171B5] transition-colors"
            size={24}
          />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-[#08519C] ">
            NutriFind
          </span>
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
                  : "text-gray-600 hover:text-[#4292C6] hover:underline underline-offset-4 decoration-2 "
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
          {/* <Link
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
          </Link> */}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-xs py-4 border border-gray-200">
          <div className="flex flex-col space-y-2 ">
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
            {/* <Link
              to="/favorites"
              className="px-8 py-2 text-gray-600 text-lg font-semibold hover:bg-green-50 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
