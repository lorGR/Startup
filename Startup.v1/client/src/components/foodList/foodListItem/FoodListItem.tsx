import React, { FC } from "react";
import { Food } from "./../../../features/food/foodModel";

interface FoodItemProps {
  foodItem: Food;
  pickedFoodArray: Array<Food>;
  setPickedFoodArray: CallableFunction;
  setCarbsSum: CallableFunction; 
  carbsSum: number
}

export const FoodListItem: FC<FoodItemProps> = ({
  foodItem,
  pickedFoodArray,
  setPickedFoodArray,
  setCarbsSum, 
  carbsSum,
}) => {
  function handleToggleAddFoodToArray() {
    try {
      if (pickedFoodArray.includes(foodItem)) {
        const result = pickedFoodArray.filter(food => food != foodItem);
        setPickedFoodArray(result);
        setCarbsSum(carbsSum - foodItem.carbs_unit)
      } else {
        setPickedFoodArray((currentState: Food[]) => [
          ...currentState,
          foodItem,
        ]);
        setCarbsSum(carbsSum + foodItem.carbs_unit)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <input type="checkbox" name="food" id={`${foodItem.food_id}`} />
      <label
        onClick={handleToggleAddFoodToArray}
        className="test"
        htmlFor={`${foodItem.food_id}`}
      >
        <div className="foodList__item">
          <p className="foodList__item__start">{foodItem.food_name}</p>
          <p className="foodList__item__center">{foodItem.unit}</p>
          <p className="foodList__item__end">{foodItem.carbs_unit} גרם</p>
        </div>
      </label>
    </>
  );
};
