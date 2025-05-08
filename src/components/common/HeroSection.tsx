import { Link } from "react-router-dom";
import FoodBG from "../../assets/FoodBG.jpg";

function HeroSection() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen w-full rounded-xl shadow-md flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${FoodBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center">
        <h1 className="break-keep text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-bold capitalize mb-4 animate-pulse tracking-wide text-balance sm:text-balance md:text-wrap lg:text-nowrap ">
          <span className="opacity-60">🍏</span> Eat healthy and stay happy.
        </h1>
        <p className="text-gray-700 text-base sm:text-base md:text-lg lg:text-lg mb-6">
          Discover nutritional facts for your favorite fruits, veggies & more...
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Link to="/browse">
          <button className="bg-[#08519C] cursor-pointer text-white px-6 py-2 rounded-xl shadow hover:bg-[#9306B] transition">
            Browse Foods
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
