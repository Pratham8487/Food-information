import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Food } from "../types/Food";
import {
  Clock,
  Tag,
  AlertCircle,
  Database,
  Book,
  Award,
  Bookmark,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { getFoodById } from "../api/foodApi";

const getNutrient = (
  foodNutrients: any[] | undefined,
  name: string
): string => {
  const nutrient = foodNutrients?.find((n) =>
    n.nutrient?.name?.toLowerCase().includes(name.toLowerCase())
  );

  if (nutrient && nutrient.amount !== undefined && nutrient.nutrient.unitName) {
    return `${nutrient.amount} ${nutrient.nutrient.unitName}`;
  }

  return "N/A";
};

const FoodDetailPage: React.FC = () => {
  const { fdcId } = useParams<{ fdcId: string }>();
  const navigate = useNavigate();

  const {
    data: food,
    isLoading,
    error,
  } = useQuery<Food, Error>({
    queryKey: ["food", fdcId],
    queryFn: () => getFoodById(fdcId || "2353623"),
    enabled: !!fdcId,
    staleTime: 5000,
    retry: 1,
  });
  console.log(food, "food dat a in detail page-----");

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 border border-gray-200">
        <div className="bg-[#DEEBF7] p-6 rounded-b-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">
            <Skeleton width={150} />
          </h1>
          <div className="flex flex-wrap gap-5 mt-4">
            <Skeleton
              className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium "
              width={80}
            />
            <Skeleton
              className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium "
              width={80}
            />
            <Skeleton
              className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium "
              width={80}
            />
            <Skeleton
              className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium "
              width={80}
            />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-white shadow-xs rounded-xl p-4">
                <Skeleton height={100} className="mb-4 rounded-md" />
                <Skeleton width={`60%`} height={8} />
              </div>
            ))}
          </div>
          <div className="bg-[#DEEBF7] rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#08519C] mb-4">
              <Skeleton width={150} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white shadow-xs rounded-xl p-4">
                  <Skeleton
                    height={10}
                    className="mb-4 rounded-md"
                    width={40}
                  />
                  <Skeleton width={`60%`} height={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pr-8">
          <Skeleton
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition cursor-pointer"
            width={80}
          />
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-xl font-bold text-red-700 mb-2">
            Something went wrong
          </h1>
          <p className="text-red-600 mb-4">
            {error?.message || "Food not found"}
          </p>
          <div className="flex items-center justify-center">
            <p
              onClick={handleGoBack}
              className="text-center my-4 cursor-pointer text-blue-500 hover:underline"
            >
              Go back
            </p>
          </div>
        </div>
      </div>
    );
  }

  const calories = getNutrient(food.foodNutrients, "Energy");
  const protein = getNutrient(food.foodNutrients, "Protein");
  const fat = getNutrient(food.foodNutrients, "Total lipid");
  const carbs = getNutrient(food.foodNutrients, "Carbohydrate");
  const sugar = getNutrient(food.foodNutrients, "Sugars");
  const fiber = getNutrient(food.foodNutrients, "Fiber");
  const alcohol = getNutrient(food.foodNutrients, "Alcohol");
  const water = getNutrient(food.foodNutrients, "Water");

  const attributeGroups: Record<string, { name?: string; value: string }[]> =
    {};

  food.foodAttributes?.forEach((attr) => {
    const typeName = attr.foodAttributeType?.name || "Other";

    if (!attributeGroups[typeName]) {
      attributeGroups[typeName] = [];
    }

    attributeGroups[typeName].push({
      name: attr.name,
      value:
        typeof attr.value === "string"
          ? attr.value
          : JSON.stringify(attr.value),
    });
  });

  // const foodUpdateLog: Record<string, {name?: string; value: string }[]> = {};

  // food.foodUpdateLog?.forEach((log) => {
  //   const Name = log.foodUpdateLo
  // })

  const hasNutritionData = food.foodNutrients && food.foodNutrients.length > 0;

  return (
    <div className="max-w-4xl mx-auto py-12 border border-gray-200">
      <div className="bg-[#DEEBF7] p-6 rounded-b-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#08306B]">
          {food.description}
        </h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {food.foodCategory && (
            <span className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium">
              {typeof food.foodCategory === "string"
                ? food.foodCategory
                : food.description}
            </span>
          )}
          {Array.isArray(food.foodCategory) && food.foodCategory.length > 0 && (
            <span className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium ">
              {food.foodCategory[0].description} (Code:{" "}
              {food.foodCategory[0].code}, ID: {food.foodCategory[0].id})
              <p>foodcategory section</p>
            </span>
          )}

          {food.dataType && (
            <span className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium">
              {food.dataType}
            </span>
          )}
          {food.fdcId && (
            <span className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium">
              ID: {food.fdcId}
            </span>
          )}
          {food.gtinUpc && (
            <span className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium">
              gtinUpc: {food.gtinUpc}
            </span>
          )}

          {food.ndbNumber && (
            <span className="inline-flex items-center px-3 py-1 bg-[#C6DBEF] text-[#08519C] rounded-full text-sm font-medium">
              ndbNumber: {food.ndbNumber}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#08519C] mb-4 flex items-center">
              <Database size={20} className="mr-2 text-[#08519C]" />
              General Information
            </h2>
            <div className="space-y-3">
              {food.publishedDate && (
                <div className="flex items-start">
                  <Clock size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Published Date</p>
                    <p className="font-medium">
                      {formatDate(food.publishedDate)}
                    </p>
                  </div>
                </div>
              )}
              {food.brandOwner && (
                <div className="flex items-start">
                  <Award size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Brand Owner</p>
                    <p className="font-medium">
                      {food.brandOwner}
                      {food.foodUpdateLog && (
                        <p className="text-xs text-gray-400">
                          ({food.foodUpdateLog[0].marketCountry})
                        </p>
                      )}
                    </p>
                  </div>
                </div>
              )}
              {food.brandName && food.subbrandName && (
                <div className="flex items-start">
                  <Bookmark size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Brand Name</p>
                    <p className="font-medium">
                      {food.brandName}{" "}
                      <span className="text-xs font-mono text-gray-700">
                        ({food.subbrandName})
                      </span>
                    </p>
                    <p className="font-medium text-xs"></p>
                  </div>
                </div>
              )}
              {food.dataType && (
                <div className="flex items-start">
                  <AlertCircle size={18} className="mt-1 mr-2 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-mono">Data Type</p>
                    <p className="font-medium text-[#2171B5]">
                      {food.dataType}
                    </p>
                    {food.foodClass && (
                      <div>
                        <p className="text-sm text-gray-500">
                          {" "}
                          <span className="font-medium text-sm ">
                            {food.foodClass}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {food.foodClass && food.foodCode && (
                <div>
                  <p className="text-sm text-gray-500 font-mono">Food Class</p>
                  <p className="font-medium text-sm mt-1">{food.foodClass}</p>
                  <br />
                  <p className="text-sm text-gray-500 font-mono">Food Code</p>
                  <p className="font-medium text-sm mt-1 ">{food.foodCode}</p>
                  <br />
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#08519C] mb-4 flex items-center">
              <Book size={20} className="mr-2 text-[#8519C]" />
              Additional Details
            </h2>
            <div className="space-y-3">
              {food.foodMeasures?.[0]?.disseminationText &&
                food.foodMeasures?.[0]?.gramWeight && (
                  <div>
                    <p className="text-sm text-gray-500">Food Measures</p>
                    <p className="font-medium">
                      {food.foodMeasures?.[0]?.disseminationText}{" "}
                      {food.foodMeasures?.[0]?.gramWeight || "g"}
                    </p>
                  </div>
                )}
              {food.servingSize && food.packageWeight && (
                <div>
                  <p className="text-sm text-gray-500">Serving Size</p>
                  <p className="font-medium">
                    {food.servingSize} {food.servingSizeUnit || "g"}{" "}
                    <span className="text-xs text-gray-500 font-medium">
                      ({food.packageWeight})
                    </span>
                  </p>
                </div>
              )}
              {food.tags && food.tags.length > 0 && (
                <div className="flex items-start">
                  <Tag size={18} className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {food.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {typeof tag === "string" ? tag : JSON.stringify(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {food.ingredients && (
                <div>
                  <p className="text-sm text-gray-500">Ingredients</p>
                  <p className="font-medium text-xs mt-1">{food.ingredients}</p>
                  {food.foodUpdateLog && food.brandedFoodCategory && (
                    <p className="text-xs font-medium">
                      <br />
                      {food.foodUpdateLog[0].householdServingFullText && (
                        <div>
                          <span className="text-gray-500 font-mono text-sm">
                            HouseHold
                            <span className="text-xs">(per person)</span>{" "}
                          </span>
                          <p className="text-xs uppercase font-medium">
                            {food.foodUpdateLog[0].householdServingFullText}
                          </p>
                        </div>
                      )}
                      {food.foodUpdateLog[0].brandedFoodCategory ||
                        food.brandedFoodCategory}
                      <br />
                    </p>
                  )}
                </div>
              )}
              {food.description && (
                <div className="gap-4">
                  <p className="font-medium text-md mt-1">
                    {food.description}{" "}
                    <span className="text-sm">({food.dataType})</span>
                  </p>
                </div>
              )}

              {food.startDate && food.endDate && food.publicationDate && (
                <div>
                  <p className="font-normal text-gray-600 font-mono text-sm mt-1">
                    Start Date:{" "}
                    <span>
                      {typeof food.startDate === "string"
                        ? food.startDate
                        : formatDate(food.startDate.toString())}
                    </span>
                    <br />
                    End Date:{" "}
                    <span>
                      {typeof food.endDate === "string"
                        ? food.endDate
                        : formatDate(food.endDate.toString())}
                    </span>
                    <br />
                    Publication Date:{" "}
                    <span>
                      {typeof food.publicationDate === "string"
                        ? food.publicationDate
                        : formatDate(food.publicationDate.toString())}
                    </span>
                  </p>
                </div>
              )}
              {food.isHistoricalReference && (
                <div>
                  <p className="text-sm text-gray-500">
                    It is Historical Referenced Food.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {hasNutritionData ? (
          <div className="bg-[#DEEBF7] rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#08519C] mb-4">
              Nutrition Facts
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">Energy</p>
                <p className="text-xl font-medium text-[#08519C]">{calories}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">Protein</p>
                <p className="text-xl font-semibold text-[#08519C]">
                  {protein}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">
                  Total Fat
                </p>
                <p className="text-xl font-semibold text-[#08519C]">{fat}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">
                  Carbohydrates
                </p>
                <p className="text-xl font-semibold text-[#08519C]">{carbs}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">Fiber</p>
                <p className="text-xl font-semibold text-[#08519C]">{fiber}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">Sugars</p>
                <p className="text-xl font-semibold text-[#08519C]">{sugar}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">Alcohol</p>
                <p className="text-xl font-semibold text-[#08519C]">
                  {alcohol}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-mono">Water</p>
                <p className="text-xl font-semibold text-[#08519C]">{water}</p>
              </div>
            </div>

            {Object.keys(attributeGroups).length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
                <h2 className="text-lg font-semibold text-[#08519C] mb-4">
                  Food Attributes
                </h2>
                {Object.entries(attributeGroups).map(
                  ([group, attributes], index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-md font-semibold text-[#2171B5] mb-2">
                        {group}
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {attributes.map((attr, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 font-mono uppercase"
                          >
                            {attr.name
                              ? `${attr.name}: ${attr.value}`
                              : attr.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
            <p className="text-gray-500">
              No nutrition data available for this item.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default FoodDetailPage;
