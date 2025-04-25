import { useState, useCallback } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getFoods, searchFoods } from "../api/foodApi";
import FoodCard from "./common/Card";
import { Search } from "lucide-react";
import { Pagination } from "@mui/material";
import { FoodSearchResponse } from "../types/Food";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TextField } from "@mui/material";

interface FoodSearchAndResultsProps {
  pageSize: number;
  useInfiniteScroll?: boolean;
}

const FoodSearchAndResults = ({
  pageSize,
  useInfiniteScroll = false,
}: FoodSearchAndResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const allFoodsQuery = useQuery<FoodSearchResponse>({
    queryKey: ["foods", currentPage],
    queryFn: () => getFoods(currentPage, pageSize),
    staleTime: 5000,
    enabled: !useInfiniteScroll && !isSearching,
  });

  const searchResultsQuery = useQuery<FoodSearchResponse>({
    queryKey: ["searchFoods", searchTerm, currentPage],
    queryFn: () => searchFoods(searchTerm, currentPage, pageSize),
    enabled: !useInfiniteScroll && isSearching && !!searchTerm,
    staleTime: 5000,
  });

  const allFoodsInfiniteQuery = useInfiniteQuery({
    queryKey: ["infiniteFoods"],
    queryFn: ({ pageParam = 1 }) => getFoods(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: useInfiniteScroll && !isSearching,
    staleTime: 5000,
  });

  const searchResultsInfiniteQuery = useInfiniteQuery({
    queryKey: ["infiniteSearchFoods", searchTerm],
    queryFn: ({ pageParam = 1 }) =>
      searchFoods(searchTerm, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: useInfiniteScroll && isSearching && !!searchTerm,
    staleTime: 5000,
  });

  const handleLoadMore = useCallback(() => {
    if (useInfiniteScroll) {
      const query = isSearching
        ? searchResultsInfiniteQuery
        : allFoodsInfiniteQuery;
      if (inView && !query.isFetchingNextPage && query.hasNextPage) {
        query.fetchNextPage();
      }
    }
  }, [
    inView,
    isSearching,
    allFoodsInfiniteQuery,
    searchResultsInfiniteQuery,
    useInfiniteScroll,
  ]);

  if (inView) {
    handleLoadMore();
  }

  function handleSearchSubmit(
    e: React.FormEvent | React.MouseEvent,
    category?: string
  ) {
    if (e) e.preventDefault();

    if (category) {
      setSearchTerm(category);
    }

    if (!useInfiniteScroll) {
      setCurrentPage(1);
    }

    setIsSearching(!!(category || searchTerm));
  }
  console.log(searchTerm);

  let isPending, error, currentData, totalPages;

  if (useInfiniteScroll) {
    const infiniteQuery = isSearching
      ? searchResultsInfiniteQuery
      : allFoodsInfiniteQuery;
    isPending = infiniteQuery.isPending;
    error = infiniteQuery.error;

    const allFoods =
      infiniteQuery.data?.pages.flatMap((page) => page.foods) || [];
    currentData = { foods: allFoods };

    totalPages =
      infiniteQuery.data?.pages[infiniteQuery.data.pages.length - 1]
        ?.totalPages || 0;
  } else {
    const query = isSearching ? searchResultsQuery : allFoodsQuery;
    isPending = query.isPending;
    error = query.error;
    currentData = query.data;
    totalPages = query.data?.totalPages || 0;
  }

  if (isPending) {
    return (
      <div className="bg-white shadow-xs rounded-xl overflow-hidden p-4">
        <Skeleton height={24} width="70%" className="mb-2" />
        <Skeleton height={18} width="40%" className="mb-2" />
        <Skeleton height={18} width="30%" className="mb-4" />
        <Skeleton count={2} height={16} className="mb-2" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      </div>
    );
  }
  console.log(currentData, "data------- in food search component---");
  if (error)
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error fetching data
      </div>
    );
  if (!currentData)
    return <div className="flex justify-center p-8">No data available</div>;

  return (
    <div className="sm:p-3 md:p-3">
      <div>
        <h1 className=" md:text-5xl py-3 sm:text-xl font-bold text-primary mb-4 flex items-center justify-center text-4xl">
          Search Food and Browse
        </h1>
        <div className="px-10 py-2 flex items-center justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-xl"
          >
            <button
              type="submit"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search size={20} />
            </button>

            <TextField
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search food like 'Apple','Milk'..."
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  height: "56px",
                  paddingLeft: "48px",
                  borderRadius: "0.75rem",
                },
              }}
            />
          </form>
        </div>
        <div className="items-center flex flex-col justify-center p-3">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-8 lg:space-x-20">
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={(e) => handleSearchSubmit(e, "Fruits")}
            >
              Fruits
            </div>
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={(e) => handleSearchSubmit(e, "Vegetables")}
            >
              Vegetables
            </div>
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={(e) => handleSearchSubmit(e, "Beverages")}
            >
              Beverages
            </div>
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF] "
              onClick={(e) => handleSearchSubmit(e, "Cold Drinks")}
            >
              Cold Drinks
            </div>
          </div>
        </div>
      </div>

      {isSearching && searchTerm && currentData.foods.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">
            No results found for "{searchTerm}"
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {currentData.foods.map((food) => (
              <FoodCard key={food.fdcId} food={food} />
            ))}
          </div>

          {useInfiniteScroll && (
            <div ref={ref} className="flex justify-center p-4 mt-4">
              {(isSearching
                ? searchResultsInfiniteQuery
                : allFoodsInfiniteQuery
              ).isFetchingNextPage ? (
                <p className="text-xl text-[#08306b] font-semibold">
                  Loading More...
                </p>
              ) : (
                  isSearching
                    ? searchResultsInfiniteQuery.hasNextPage
                    : allFoodsInfiniteQuery.hasNextPage
                ) ? (
                <p className="text-xl text-[#08306b] font-semibold transition ease-in duration-300">
                  Loading More...
                </p>
              ) : (
                <p className="text-xl text-[#08306b] font-semibold transition ease-in duration-300">
                  Nothing More to Load...
                </p>
              )}
            </div>
          )}

          {!useInfiniteScroll && (
            <div className="p-5 flex items-center justify-center">
              <Pagination
                page={currentPage}
                count={totalPages}
                onChange={(_, value) => setCurrentPage(value)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FoodSearchAndResults;
