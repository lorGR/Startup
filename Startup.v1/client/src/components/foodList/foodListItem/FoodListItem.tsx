import React, { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";
import { useAppDispatch, useAppSelector } from "./../../../app/hooks";
import {
  addFood,
  foodarraySelector,
  removeFood,
} from "../../../features/food/foodArraySlice";
import { addCarbs, removeCarbs } from "../../../features/carbs/carbsSlice";
import axios from "axios";

interface FoodItemProps {
  foodItem: Food;
  foodFavoritesArray?: Food[];
}

export const FoodListItem: FC<FoodItemProps> = ({
  foodItem,
  foodFavoritesArray,
}) => {
  const dispatch = useAppDispatch();
  const foodArray = useAppSelector(foodarraySelector);
  const [favorite, setFavorite] = useState();

  useEffect(() => {
    checkIfFoodIsAdded();
    checkIfFoodIsfavorite();
  }, []);

  function handleToggleAddFoodToArray() {
    try {
      const exist = foodArray.find((food) => foodItem.food_id === food.food_id);
      if (exist) {
        const result = foodArray.filter((food) => food.food_id != foodItem.food_id);
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

  function checkIfFoodIsfavorite() {
    try {
      foodFavoritesArray?.forEach((favFood) => {
        if (favFood.food_id === foodItem.food_id) {
          const starSpan = document.getElementById(`span${foodItem.food_id}`);
          starSpan?.classList.add("fill");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddToFavorite(event: any) {
    try {
      event.preventDefault();
      event.stopPropagation();
      const foodId = event.target.id.replace("span", "");
      console.log(foodId);
      const { data } = await axios.post(
        "/api/user-favorites/add-to-favorites",
        { foodId }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex" style={{ display: "flex", alignItems: "center" }}>
      <input type="checkbox" name="food" id={`${foodItem.food_id}`} />
      <label
        onClick={handleToggleAddFoodToArray}
        className="test"
        htmlFor={`${foodItem.food_id}`}
      >
        <div className="foodList__item">
          <span
            onClick={handleAddToFavorite}
            id={`span${foodItem.food_id}`}
            className="material-symbols-outlined"
          >
            star
          </span>
          <p className="foodList__item__start">{foodItem.food_name}</p>
          <p className="foodList__item__center">{foodItem.unit}</p>
          <p className="foodList__item__end">{foodItem.carbs_unit} גרם</p>
        </div>
      </label>
    </div>
  );
};
