import { useQuery } from "@tanstack/react-query";
import { searchFoods, getAllFoods } from "./api/foodApi";

const TestApi = () => {
  const { data, isPending , error } = useQuery({
    queryKey: ["test-search"],
    // queryFn: () => searchFoods("Cheddar cheese"),
    queryFn: () => getAllFoods(),
  });

  if (isPending ) return (<p>Loading data...</p>);
  if (error) return <p>Error fetching data</p>;

  console.log("Search Result:", data);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">API Test Result:</h2>
      <ul className="list-disc pl-5">
        {data.foods?.map((food: any) => (
          <li key={food.fdcId} className="text-red-500 border-b border-black">
            {food.description} - {food.dataType},<br/>tags:{food.tags},<br/>
            {food.publishedDate},<br/>
            Score:{food.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestApi;
