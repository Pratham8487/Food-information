// pages/HomePage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../api/foodApi";
import FoodCard from "../components/common/Card";

interface Food {
  fdcId: string;
  description?: string;
  brandOwner?: string;
  foodCategory?: string;
}

interface FoodsResponse {
  foods: Food[];
  totalPages: number;
  totalHits: number;
  currentPage: number;
}

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 25;

  const { data, isPending, error } = useQuery<FoodsResponse>({
    queryKey: ["foods", currentPage],
    queryFn: () => getFoods(currentPage, PAGE_SIZE),
    staleTime: 5000,
  });

console.log("data:---",data)


  const handleNextPage = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isPending)
    return <div className="flex justify-center p-8">Loading data...</div>;
  if (error)
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error fetching data
      </div>
    );
  if (!data)
    return <div className="flex justify-center p-8">No data available</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.foods.map((food) => (
          <FoodCard
            key={food.fdcId}
            food={{ ...food, description: food.description || "No description available" }}
            onClick={() => console.log(food.fdcId)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-600">
          Showing {(currentPage - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(currentPage * PAGE_SIZE, data.totalHits)} of{" "}
          {data.totalHits} foods
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= data.totalPages}
            className={`px-4 py-2 rounded ${
              currentPage >= data.totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
