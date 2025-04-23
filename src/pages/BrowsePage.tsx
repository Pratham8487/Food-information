import FoodSearchAndResults from "../components/FoodSearchandResults";
import { ErrorBoundary } from "react-error-boundary";

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
    <div className="md:p-3 sm:p-3">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FoodSearchAndResults pageSize={12} useInfiniteScroll={true} />
        {/* <FoodSearchAndResults Page_size={17} /> */}
      </ErrorBoundary>
    </div>
  );
};

export default Browse;
