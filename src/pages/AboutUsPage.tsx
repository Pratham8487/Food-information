import FoodBG from "../assets/BalancedFood_Img.jpg";
import { Link } from "react-router-dom";

function AboutUsPage() {
  return (
    <div className="p-3">
      <div
        style={{ backgroundImage: `url(${FoodBG})` }}
        className="bg-cover bg-center min-h-screen rounded-xl shadow-md w-full object-cover flex flex-col items-center justify-center "
      >
        <div className="text-center">
          <h1 className="break-keep text-4xl md:text-5xl font-bold text-primary mb-4 animate-pulse">
            <span className="opacity-60">🍏</span> Eat healthy and stay happy.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover nutritional facts for your favorite fruits, veggies &
            more...
          </p>
        </div>
        <div className="flex items-center justify-center shadow-sm">
          <Link to="/">
            <button className="bg-[#08519C] cursor-pointer text-white px-6 py-2 rounded-xl shadow hover:bg-[#9306B] transition">
              Home 
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
