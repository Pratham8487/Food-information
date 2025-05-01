import {
  useState,
  useCallback,
  useEffect,
  useRef,
  SetStateAction,
} from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
      setIsTyping(false);
      if (value) {
        setIsSearching(true);
        if (!useInfiniteScroll) {
          setCurrentPage(1);
        }
      } else {
        setIsSearching(false);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleCategorySelect(category: SetStateAction<string>) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setInputValue(category);
    setSearchTerm(category);
    setIsTyping(false);
    setIsSearching(true);

    if (!useInfiniteScroll) {
      setCurrentPage(1);
    }
  }

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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton width={300} />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white shadow-xs rounded-xl p-4">
              <Skeleton height={200} className="mb-4 rounded-md" />
              <Skeleton width={`80%`} height={20} className="mb-2" />
              <Skeleton width={`60%`} height={16} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex flex-col text-4xl items-center justify-center p-8 text-red-500 min-h-screen">
        <p className="text-[#08519C] animate-bounce ">
          <span className="text-[#0830B6]">Oops!</span> Internal Server Error...
        </p>
        <p className="text-[#0830B6] animate-bounce">ReLoad the Page...</p>
      </div>
    );
  if (!currentData)
    return <div className="flex justify-center p-8">No data available</div>;

  return (
    <div className="sm:p-3 md:p-3">
      <div>
        <h1 className="md:text-5xl py-3 sm:text-xl font-bold text-primary mb-4 flex items-center justify-center text-4xl">Search Food and Browse</h1>
        <div className="px-10 py-2 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </div>

            <TextField
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search food like 'Apple','Milk'..."
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  height: "56px",
                  paddingLeft: "48px",
                  borderRadius: "0.75rem",
                },
                endAdornment: isTyping && (
                  <div className="text-sm text-gray-500 mr-2">Typing...</div>
                ),
              }}
            />
          </div>
        </div>
        <div className="items-center flex flex-col justify-center p-3">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-8 lg:space-x-20">
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={() => handleCategorySelect("Fruits")}
            >
              Fruits
            </div>
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={() => handleCategorySelect("Vegetables")}
            >
              Vegetables
            </div>
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={() => handleCategorySelect("Beverages")}
            >
              Beverages
            </div>
            <div
              className="rounded-full bg-[#DEEBF7] px-4 py-2 text-[#08519C] border border-[#6BAED6] cursor-pointer text-sm md:text-base hover:bg-[#C6DBEF]"
              onClick={() => handleCategorySelect("Cold Drinks")}
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
                <p className="text-2xl text-[#08306b] font-semibold transition ease-in duration-300 animate-bounce">
                  Loading More...
                </p>
              ) : (
                <p className="text-2xl text-[#08306b] font-semibold transition ease-in duration-300 animate-bounce">
                  All Caught Up... 🎉
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
