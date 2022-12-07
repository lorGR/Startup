import React, { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";
import { useAppDispatch, useAppSelector } from "./../../../app/hooks";
import {
  addFood,
  foodarraySelector,
  removeFood,
} from "../../../features/food/foodArraySlice";
import { addCarbs, removeCarbs } from "../../../features/carbs/carbsSlice";

interface FoodItemProps {
  foodItem: Food;
}

export const FoodListItem: FC<FoodItemProps> = ({ foodItem }) => {
  const dispatch = useAppDispatch();
  const foodArray = useAppSelector(foodarraySelector);

  const [checked, setChecked] = useState<boolean>(false);

  function handleToggleAddFoodToArray() {
    try {
      const exist = foodArray.find((food) => foodItem.food_id === food.food_id);
      if (exist) {
        const result = foodArray.filter((food) => food != foodItem);
        dispatch(removeFood(result));
        dispatch(removeCarbs(foodItem.carbs_unit));
      } else {
        dispatch(addFood(foodItem));
        dispatch(addCarbs(foodItem.carbs_unit));
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    checkIfFoodIsAdded();
  }, []);

  function checkIfFoodIsAdded() {
    try {
      foodArray.forEach((food) => {
        if (foodItem.food_id === food.food_id) {
          const input = document.getElementById(
            `${foodItem.food_id}`
          ) as HTMLInputElement;
          if (input) {
            input.checked = true;
          }
        }
      });
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
