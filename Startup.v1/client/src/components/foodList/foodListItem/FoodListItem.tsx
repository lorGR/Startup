import React, { FC, useEffect } from "react";
import { Food } from "./../../../features/food/foodModel";
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { addFood, foodarraySelector, removeFood } from "../../../features/food/foodArraySlice";

interface FoodItemProps {
  foodItem: Food;
  setCarbsSum: CallableFunction; 
  carbsSum: number
}

export const FoodListItem: FC<FoodItemProps> = ({
  foodItem,
  setCarbsSum, 
  carbsSum,
}) => {
  const dispatch = useAppDispatch();
  const foodArray = useAppSelector(foodarraySelector)

  function handleToggleAddFoodToArray() {
    try {
      if (foodArray.includes(foodItem)) {
        const result = foodArray.filter(food => food != foodItem);
        dispatch(removeFood(result))
        console.log(foodArray)
      } else {
        dispatch(addFood(foodItem))
        console.log(foodArray)
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
