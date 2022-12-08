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
import { useDispatch } from 'react-redux';
import { favoriteFoodarraySelector } from './../../../features/favoriteFood/favoriteFoodArraySlice';
import { removeFoodToUserFavorite } from "../../../features/favoriteFood/favoriteFoodArrayAPI";
import { addFoodToUserFavorites, getAllUserFavoriteFood } from './../../../features/favoriteFood/favoriteFoodArrayAPI';

interface FoodItemProps {
  foodItem: Food;
  foodFavoritesArray?: Food[];
}

export const FoodListItem: FC<FoodItemProps> = ({
  foodItem
}) => {
  const dispatch = useAppDispatch();
  const foodArray = useAppSelector(foodarraySelector);
  const FavoriteFoodArray = useAppSelector(favoriteFoodarraySelector);
  useEffect(() => {
    checkIfFoodIsAdded();
    checkIfFoodIsfavorite();
  }, []);

  function handleAddFoodToArray() {
    try {
      const exist = foodArray.find((food) => foodItem.food_id === food.food_id);
      if (exist) {
        const result = foodArray.filter(
          (food) => food.food_id != foodItem.food_id
        );
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
      FavoriteFoodArray?.forEach((favFood) => {
        if (favFood.food_id === foodItem.food_id) {
          const starSpan = document.getElementById(`span${foodItem.food_id}`);
          starSpan?.classList.add("fill");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handletoggleFavorite(event: any) {
    try {
      event.preventDefault();
      event.stopPropagation();
      const foodId = event.target.id.replace("span", "");
      console.log(foodId);
      const star = (event.target.className);
      if(star.includes("fill")) {
        event.target.classList.remove("fill")
      } else {
        event.target.classList.add("fill")
      }

      if (FavoriteFoodArray) {
        const exist = FavoriteFoodArray.find(
          (food) => foodItem.food_id === food.food_id
        );
        if (exist) {
          const foodId = foodItem.food_id;
          dispatch(removeFoodToUserFavorite({foodId}));
        } else if (!exist) {
          dispatch(addFoodToUserFavorites({foodId}));
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex" style={{ display: "flex", alignItems: "center" }}>
      <input type="checkbox" name="food" id={`${foodItem.food_id}`} />
      <label
        onClick={handleAddFoodToArray}
        className="test"
        htmlFor={`${foodItem.food_id}`}
      >
        <div className="foodList__item">
          <span
            onClick={handletoggleFavorite}
            id={`span${foodItem.food_id}`}
            className={`material-symbols-outlined`}
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
