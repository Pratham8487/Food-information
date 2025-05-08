import { Link } from "react-router-dom";
import InfoSection from "../components/common/InfoSection";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

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

      <InfoSection
        title="Our Purpose"
        description="NutriFind was created to make nutrition data simple, clear, and
        accessible for everyone."
      />

      <InfoSection
        title="How to Use NutriFind"
        description={
          <>
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
                View detailed calories, proteins, fats, carbohydrates, and more
                for each item.
              </li>
            </ul>
          </>
        }
      />

      <InfoSection
        title="Where Our Data Comes From"
        description={
          <>
            All nutrition information is sourced from the official{" "}
            <Link to={usdawebsite} target="_blank" rel="noopener noreferrer">
              <span className="underline decoration-1 text-[#2171B5] hover:text-[#08519C] ">
                USDA FoodData Central database.
              </span>
            </Link>
          </>
        }
      />

      <InfoSection
        title="About the Developer"
        description={
          <>
            <p className="text-gray-900 mb-6">
              This project was built using React, Vite, and Tailwind CSS as a
              personal project to help others stay informed and healthy.
            </p>
            <p>
              <Link to={GithuBLink} target="_blank" rel="noopener noreferrer">
                <span className="underline decoration-1 text-[#2171B5] ">
                  Pratham Shah
                </span>
              </Link>
            </p>
          </>
        }
      />
      <ScrollToTopButton />
    </div>
  );
};

export default AboutPage;
