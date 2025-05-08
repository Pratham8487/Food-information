import HeroSection from "../components/common/HeroSection";
import FoodSearchAndResults from "../components/FoodSearchandResults";
import { ErrorBoundary } from "react-error-boundary";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const ErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-red-500">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p>There was an error loading the food data. Please try again later.</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <HeroSection />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FoodSearchAndResults pageSize={12} useInfiniteScroll={false} />
        <ScrollToTopButton/>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
