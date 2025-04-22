import React from "react";

interface FoodCardProps {
  food: {
    description: string;
    brandOwner?: string;
    foodCategory?: string;
  };
  onClick: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-bold text-lg truncate">{food.description}</h3>
      {food.brandOwner && (
        <p className="text-gray-600 text-sm truncate">
          Brand: {food.brandOwner}
        </p>
      )}
      {food.foodCategory && (
        <p className="text-gray-500 text-sm">Category: {food.foodCategory}</p>
      )}
    </div>
  );
};

export default FoodCard;
