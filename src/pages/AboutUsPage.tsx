import { Link } from "react-router-dom";

const AboutPage = () => {
  const usdawebsite = "https://fdc.nal.usda.gov/";
  const GithuBLink = "https://github.com/Pratham8487/Food-information";
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center text-[#08519C]">
        About NutriFind Journey
      </h1>
      <p className="text-lg text-black mb-6 text-center max-w-2xl mx-auto">
        NutriFind is your easy-to-use guide to explore detailed nutritional
        information about a wide variety of foods.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#2171B5] ">
        Our Purpose
      </h2>
      <p className="text-gray-900 mb-6">
        NutriFind was created to make nutrition data simple, clear, and
        accessible for everyone.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#2171B5]">
        How to Use NutriFind
      </h2>
      <ul className="list-disc list-inside text-gray-900 mb-6">
        <li>
          Browse our{" "}
          <Link to="/">
            <span className="underline decoration-1 text-[#2171B5] hover:text-[#08519C] ">
              Home page
            </span>
          </Link>{" "}
          to discover popular foods and their nutrition facts.
        </li>
        <li>
          Use the{" "}
          <Link to="/browse">
            <span className="underline decoration-1 text-[#2171B5] hover:text-[#08519C] ">
              Browse page
            </span>
          </Link>{" "}
          to search for any food item you're curious about.
        </li>
        <li>
          View detailed calories, proteins, fats, carbohydrates, and more for
          each item.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#2171B5]">
        Where Our Data Comes From
      </h2>
      <p className="text-gray-900 mb-6">
        All nutrition information is sourced from the official{" "}
        <Link to={usdawebsite} target="_blank" rel="noopener noreferrer">
          <span className="underline decoration-1 text-[#2171B5] hover:text-[#08519C] ">
            USDA FoodData Central database.
          </span>
        </Link>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#2171B5] hover:text-[#08519C]">
        About the Developer
      </h2>
      <p className="text-gray-900 mb-6">
        This project was built using React, Vite, and Tailwind CSS as a personal
        project to help others stay informed and healthy.
      </p>
      <p>
        <Link to={GithuBLink} target="_blank" rel="noopener noreferrer">
          <span className="underline decoration-1 text-[#2171B5] ">
            Pratham Shah
          </span>
        </Link>
      </p>
    </div>
    // </div>
  );
}


export default AboutPage;