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

const Browse = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="p-6 sm:p-4 md:p-4 lg:p-6">
        <FoodSearchAndResults pageSize={12} useInfiniteScroll={true} />
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
};

export default Browse;
