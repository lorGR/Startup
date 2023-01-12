import React, { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";
import { useAppDispatch, useAppSelector } from "./../../../app/hooks";
import {
  addFood,
  foodarraySelector,
  removeFood,
} from "../../../features/food/foodArraySlice";
import { addCarbs, removeCarbs } from "../../../features/carbs/carbsSlice";
import { favoriteFoodarraySelector } from "./../../../features/favoriteFood/favoriteFoodArraySlice";
import { removeFoodToUserFavorite } from "../../../features/favoriteFood/favoriteFoodArrayAPI";
import { addFoodToUserFavorites } from "./../../../features/favoriteFood/favoriteFoodArrayAPI";
import { userSelector } from "../../../features/user/userSlice";
import { CarbsUnit } from "../../../features/user/userModel";
import { openMealSelector } from "../../../features/openMeal/openMealSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { foodListArraySelector, addFavoriteFood, removeFavoriteFood } from './../../../features/foodListArray/foodListArraySlice';

interface FoodItemProps {
  foodItem: Food;
  foodFavoritesArray?: Food[];
  unit: string;
}

export const FoodListItem: FC<FoodItemProps> = ({ foodItem, unit }) => {
  const dispatch = useAppDispatch();
  const foodArray = useAppSelector(foodarraySelector);
  const FavoriteFoodArray = useAppSelector(favoriteFoodarraySelector);
  const user = useAppSelector(userSelector);
  const openMeal = useAppSelector(openMealSelector);
  const foodListArray = useAppSelector(foodListArraySelector)
  const navigate = useNavigate();

  useEffect(() => {
    checkIfFoodIsAdded();
    // checkIfFoodIsfavorite();
    // handleGetUserFood();
  }, []);

  function handleAddFoodToArray() {
    try {
      const exist = foodArray.find((food) => foodItem.food_id === food.food_id);
      if (exist) {
        const result = foodArray.filter(
          (food) => food.food_id != foodItem.food_id
        );
        dispatch(removeFood(result));
        if (user?.carbs_unit === CarbsUnit.PORTION) {
          dispatch(removeCarbs(foodItem.carbs_unit));
        } else if (user?.carbs_unit === CarbsUnit.GRAM) {
          dispatch(removeCarbs(foodItem.carbs));
        }
      } else {
        dispatch(addFood(foodItem));
        if (user?.carbs_unit === CarbsUnit.PORTION) {
          dispatch(addCarbs(foodItem.carbs_unit));
        } else if (user?.carbs_unit === "gram") {
          dispatch(addCarbs(foodItem.carbs));
        }
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

  // function checkIfFoodIsfavorite() {
  //   try {
  //     FavoriteFoodArray?.forEach((favFood) => {
  //       if (favFood.food_id === foodItem.food_id) {
  //         const starSpan = document.getElementById(`span${foodItem.food_id}`);
  //         starSpan?.classList.add("fill");
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function handelEditItem() {
    try {
      navigate("/add-food", { state: { id: foodItem.food_id } });
    } catch (error) {
      console.error(error);
    }
  }

  async function handletoggleFavorite(event: any) {
    try {
      event.preventDefault();
      event.stopPropagation();
      const foodId = foodItem.food_id
      const star = event.target.className;

      if(foodItem.favorite) {
        event.target.classList.remove("fill");
        dispatch(removeFavoriteFood(foodId));
        const { data } = await axios.post(
          "/api/user-favorites/delete-from-favorites",
          { foodId }
        );
      }else {
        event.target.classList.add("fill");
        dispatch(addFavoriteFood(foodId))
        const { data } = await axios.post(
          `/api/user-favorites/add-to-favorites`,
          { foodId }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleGetUserFood() {
    try {
      const { data } = await axios.get("/api/food/get-user-food");
      const { result } = data;
      result.forEach((userFood: Food) => {
        if (
          userFood.food_id !== null &&
          userFood.food_id === foodItem.food_id
        ) {
          foodItem = userFood;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (unit === "portion") {
    return (
      <div className="flex food-item">
        {openMeal?.opened_to_edit === 1 && (
          <div className="food-item-container">
            <input type="checkbox" name="food" id={`${foodItem.food_id}`} />
            <label
              onDoubleClick={handelEditItem}
              onClick={handleAddFoodToArray}
              className="test"
              htmlFor={`${foodItem.food_id}`}
            >
              <div className="foodList__item">
                <span
                  // onClick={handletoggleFavorite}
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
        )}
        {openMeal?.opened_to_edit === 0 && (
          <div className="food-item-container">
            <input
              type="checkbox"
              disabled
              name="food"
              id={`${foodItem.food_id}`}
            />
            <label
              onDoubleClick={handelEditItem}
              className="test"
              htmlFor={`${foodItem.food_id}`}
            >
              <div className="foodList__item">
                <span
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
        )}
      </div>
    );
  } else {
    return (
      <div className="flex food-item">
        {openMeal?.opened_to_edit === 1 && (
          <div className="food-item-container">
            <input type="checkbox" name="food" id={`${foodItem.food_id}`} />
            <label
              onClick={handleAddFoodToArray}
              onDoubleClick={handelEditItem}
              className="test"
              htmlFor={`${foodItem.food_id}`}
            >
              <div className="foodList__item">
                {/* <span
                  // onClick={handletoggleFavorite}
                  id={`span${foodItem.food_id}`}
                  className={`material-symbols-outlined`}
                >
                  star
                </span> */}
                {foodItem.favorite === true && <span
                  // onClick={handletoggleFavorite}
                  id={`span${foodItem.food_id}`}
                  className={`material-symbols-outlined fill`}
                >
                  star
                </span>}
                {foodItem.favorite === false && <span
                  // onClick={handletoggleFavorite}
                  id={`span${foodItem.food_id}`}
                  className={`material-symbols-outlined`}
                >
                  star
                </span>}
                <p className="foodList__item__start">{foodItem.food_name}</p>
                <p className="foodList__item__center">100 ג</p>
                <p className="foodList__item__end">{foodItem.carbs} ג</p>
              </div>
            </label>
          </div>
        )}
        {openMeal?.opened_to_edit === 0 && (
          <div className="food-item-container">
            <input
              disabled
              type="checkbox"
              name="food"
              id={`${foodItem.food_id}`}
            />
            <label
              onDoubleClick={handelEditItem}
              className="test"
              htmlFor={`${foodItem.food_id}`}
            >
              <div className="foodList__item">
                {/* <span
                  // onClick={handletoggleFavorite}
                  id={`span${foodItem.food_id}`}
                  className={`material-symbols-outlined`}
                >
                  star
                </span> */}
                {foodItem.favorite === true && <span
                  onClick={handletoggleFavorite}
                  id={`span${foodItem.food_id}`}
                  className={`material-symbols-outlined fill`}
                >
                  star
                </span>}
                {foodItem.favorite === false && <span
                  onClick={handletoggleFavorite}
                  id={`span${foodItem.food_id}`}
                  className={`material-symbols-outlined`}
                >
                  star
                </span>}
                <p className="foodList__item__start">{foodItem.food_name}</p>
                <p className="foodList__item__center">100 ג</p>
                <p className="foodList__item__end">{foodItem.carbs} ג</p>
              </div>
            </label>
          </div>
        )}
      </div>
    );
  }
};
