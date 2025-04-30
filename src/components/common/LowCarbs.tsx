import { useQuery } from "@tanstack/react-query";
import { FoodSearchResponsebyQuery } from "../../types/Food";
import { useState } from "react";
import { searchFoodsforLowCarbs } from "../../api/foodApi";
import { Pagination } from "@mui/material";
import FoodCard from "./Card";

interface LowCarbsProps {
  pageSize: number;
}

function LowCarbs({ pageSize = 17 }: LowCarbsProps) {
  const [searchTerm] = useState("Low carbs");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: food,
    isPending,
    error,
  } = useQuery<FoodSearchResponsebyQuery>({
    queryKey: ["searchFoods", searchTerm, currentPage],
    queryFn: () => searchFoodsforLowCarbs(searchTerm, currentPage, pageSize),
    // enabled: !useInfiniteScroll && isSearching && !!searchTerm,
    staleTime: 5000,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-6 min-h-screen">
        <p className="text-xl text-[#08306b] font-semibold">Loading More...</p>
      </div>
    );
  }

  console.log(food, "\ndata-------");

  if (error)
    return (
      <div className="flex justify-center items-center p-6 min-h-screen">
        <p className="text-xl text-[#08306b] font-semibold">
          Something Went wrong...
        </p>
      </div>
    );

  if (!food) {
    return (
      <div className="flex justify-center items-center p-6 min-h-screen">
        <p className="text-xl text-[#08306b] font-semibold">Data Not Available...</p>
      </div>
    );
  }

  return (
    <div className="sm:p-3 md:p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {food.foods.map((food) => (
          <FoodCard key={food.fdcId} food={food} />
        ))}
      </div>
      <div className="p-5 flex items-center justify-center">
        <Pagination
          page={currentPage}
          count={food.totalPages}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </div>
    </div>
  );
}

export default LowCarbs;
