import { Food } from "../../types/Food";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FoodCardProps {
  food: Food;
}

const getNutrient = (foodNutrients: any[] | undefined, name: string) =>
  foodNutrients?.find((n: { nutrientName: string }) =>
    n.nutrientName.toLowerCase().includes(name.toLowerCase())
  )?.value || "N/A";

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const calories = getNutrient(food.foodNutrients, "Energy");
  const protein = getNutrient(food.foodNutrients, "Protein");
  const fat = getNutrient(food.foodNutrients, "Total Lipid");
  const crabs = getNutrient(food.foodNutrients, "Carbohydrate");

  const hasNutritionData = food.foodNutrients && food.foodNutrients.length > 0;

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/food/${food.fdcId}`);
  };

  const foodCategoryName = food.foodCategory?.[0]?.description ?? "Uncategorized";


  return (
    <div
      className="bg-white shadow-xs rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-[#DEEBF7] p-4 border-b border-blue-100">
        <h2 className="text-lg font-bold text-[#08519C] break-normal">
          {food.description}
        </h2>
        <div className="flex items-center mt-1 text-sm text-[#2171B5]">
          <span className="px-2 py-0.5 bg-blue-100 rounded-full">
            {/* {food.foodCategory || "Uncatagorized"} */}
            {foodCategoryName}
          </span>
          {food.dataType && (
            <span className="ml-2 px-2 py-0.5 bg-[#DEEBF7] rounded-full">
              {food.dataType}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col space-y-2">
          {food.brandOwner && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-2">Brand:</span>
              <span className="text-gray-600">{food.brandOwner}</span>
            </div>
          )}

          {food.publishedDate && (
            <div className="flex items-center text-sm">
              <Clock size={16} className="mr-1 text-gray-500" />
              <span className="text-gray-600 font-mono">
                Published: {new Date(food.publishedDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {hasNutritionData && (
          <div className="mt-4 p-3 bg-[#DEEBF7] rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-blue-800">Nutrition Facts</h3>
              {calories !== "N/A" && (
                <div className="text-sm font-medium bg-blue-100 px-2 py-1 rounded-full">
                  {calories} kcal
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="flex flex-col items-center p-2 bg-white rounded-lg">
                <span className="text-xs text-gray-500 font-mono">
                  Protein:
                </span>
                <span className="font-bold text-[#2171B5]">{protein}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white rounded-lg">
                <span className="text-xs text-gray-500 font-mono">Fat</span>
                <span className="font-bold text-[#2171B5]">{fat}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white rounded-lg">
                <span className="text-xs text-gray-500 font-mono">Crabs</span>
                <span className="font-bold text-[#2171B5]">{crabs}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;