import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { searchFoodsforLowCarbs } from "../../api/foodApi";
import { FoodSearchResponsebyQuery } from "../../types/Food";
import { Pagination } from "@mui/material";
import FoodCard from "../../components/common/Card";

interface QueryPageProps {
  pageSize?: number;
}

function QueryPage({ pageSize = 17 }: QueryPageProps) {
  const { query } = useParams(); 
  const [currentPage, setCurrentPage] = useState(1);

  
  const searchTerm = query?.replace(/-/g, " ") || "Diet";

  const {
    data: food,
    isPending,
    error,
  } = useQuery<FoodSearchResponsebyQuery>({
    queryKey: ["searchFoods", searchTerm, currentPage],
    queryFn: () => searchFoodsforLowCarbs(searchTerm, currentPage, pageSize),
    staleTime: 5000,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-6 min-h-screen">
        <p className="text-xl text-[#08306b] font-semibold">Loading More...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-6 min-h-screen">
        <p className="text-xl text-[#08306b] font-semibold">
          Something Went wrong...
        </p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center p-6 min-h-screen">
        <p className="text-xl text-[#08306b] font-semibold">
          Data Not Available...
        </p>
      </div>
    );
  }

  return (
    <div className="sm:px-6 md:px-4 px-4 py-4">
      <h2 className="text-2xl font-semibold mb-4 text-[#08306b] capitalize flex items-center justify-center">
        {searchTerm} Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {food.foods.map((food) => (
          <FoodCard key={food.fdcId} food={food} />
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center">
        <Pagination
          page={currentPage}
          count={food.totalPages}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </div>
    </div>
  );
}

export default QueryPage;
