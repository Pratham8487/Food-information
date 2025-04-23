import { Link } from "react-router-dom";
import FoodImg from "../../assets/FoodImage.jpg";

function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          <span>🍏</span> Eat healthy and stay happy
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover nutritional facts for your favorite fruits, veggies & more
        </p>
        <Link to="/browse">
          <button className="bg-[#08519C] cursor-pointer text-white px-6 py-2 rounded-xl shadow hover:bg-[#9306B] transition">
            Browse Foods
          </button>
        </Link>
      </div>

      <div>
        <img
          src={FoodImg}
          alt="Healthy foods"
          className="rounded-xl shadow-lg w-full object-cover"
        />
      </div>
    </div>
  );
}

export default HeroSection;
