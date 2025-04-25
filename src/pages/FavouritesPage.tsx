import { getFoodById } from "../api/foodApi";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "../components/common/Card";

type FavouritePageProps = {
  fav: number[];
};

const FavouritePage = ({ fav }: FavouritePageProps) => {
  const {
    data: foods,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["favouriteFoods", fav],
    queryFn: async () => {
      const foodData = await Promise.all(
        fav.map((fdcId) => getFoodById(fdcId.toString()))
      );
      return foodData;
    },
    enabled: fav.length > 0,
    staleTime: 5000,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data!</p>;
  }

  return (
    <div>
      {foods && foods.length > 0 ? (
        foods.map((food) => <FoodCard key={food.fdcId} food={food} />)
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavouritePage;
