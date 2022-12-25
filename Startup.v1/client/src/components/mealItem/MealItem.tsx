import axios from "axios";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { Food } from "../../features/food/foodModel";
import {Meal} from "../../features/openMeal/mealModel"
import ServingItem from "./servingItem/ServingItem";

interface MealItemProps {
  meal: Meal;
  setMeals: CallableFunction;
  date: string
}

const MealItem: React.FC<MealItemProps> = ({ meal, setMeals, date }) => {
  const [mealServings, setMealServings] = useState<Food[]>([]);
  const [dropDown, setDropDown] = useState<boolean>(false);

  const handleClickMeal = async (event: any) => {
    try {
      let mealId = null;
      if (event.target.nodeName === "P") {
        mealId = event.target.parentNode.id;
      } else {
        mealId = event.target.id;
      }
      const { data } = await axios.post("/api/meals/get-meals-servings", {
        mealId,
      });
      if (!data)
        throw new Error(
          "Coudln't receive data from axios POST ON FUNCTION handleClickMeal IN FILE MealItem.tsx "
        );
      const { result } = data;

      if (!dropDown) {
        setDropDown(!dropDown);
      } else {
        setDropDown(!dropDown);
      }
      setMealServings(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMeal = async (event: any) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      console.log("trying To delete");
      const mealId = meal.meal_id;
      const { data } = await axios.post("/api/meals/delete-meal-by-id", {
        mealId,
      });
      console.log(data);
      const { result } = data;
      setMeals(result);
    } catch (error) {
      console.error(error);
    }
  };
  function InititeDelete(event:any) {
    try {
      event.preventDefault();
      event.stopPropagation();
      const messege = document.getElementById(
        `${meal.meal_id}message`
      ) as HTMLDivElement;
      messege.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }
  const handleCloseForm = () => {
    try {
      const messege = document.getElementById(
        `${meal.meal_id}message`
      ) as HTMLDivElement;
      messege.style.display = "none";
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="meal-item dropbtn">
      <div
        onClick={handleClickMeal}
        className="meal-item__content"
        id={meal.meal_id!.toString()}
      >
        <span onClick={InititeDelete} className="material-symbols-outlined">
          delete
        </span>
        <p>אינס׳ {meal.insulin}</p>
        <p> פחמ׳ {meal.carbs}</p>
        <p>{meal.time.slice(0, 5)}</p>
      </div>
      <div className="dropdown-content ">
        {dropDown &&
          mealServings.length > 0 &&
          mealServings.map((mealServ) => {
            return (
              <ServingItem
                key={mealServ.serving_id}
                mealServ={mealServ}
                setMealServings={setMealServings}
                setMeals={setMeals}
                date={date}
              />
            );
          })}
      </div>
      <form
        onSubmit={handleDeleteMeal}
        className="messege_container"
        id={`${meal.meal_id}message`}
      >
        <h5>Are you sure you want to delete this meal?</h5>
        <button type="submit">V</button>
        <button onClick={handleCloseForm} type="button">
          X
        </button>
      </form>
    </div>
  );
};

export default MealItem;
