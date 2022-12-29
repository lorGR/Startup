import axios from "axios";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Food } from "../../features/food/foodModel";
import { Meal } from "../../features/openMeal/mealModel";
import { openMealSelector } from "../../features/openMeal/openMealSlice";
import ServingItem from "./servingItem/ServingItem";
import { useAppDispatch } from "./../../app/hooks";
import { deleteLastMeal } from "./../../features/openMeal/openMealAPI";

interface MealItemProps {
  meal: Meal;
  setMeals: CallableFunction;
  date: string;
  type: string;
}

const MealItem: React.FC<MealItemProps> = ({ meal, setMeals, date, type }) => {
  const [mealServings, setMealServings] = useState<Food[]>([]);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const openMeal = useAppSelector(openMealSelector);
  const dispatch = useAppDispatch();

  const handleClickMeal = async (event: any) => {
    try {
      if (openMeal?.opened_to_edit === 0) return;
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
      if (openMeal) {
        const mealId = openMeal.meal_id;
        if (mealId) dispatch(deleteLastMeal({ mealId }));
      }
      handleCloseForm();
    } catch (error) {
      console.error(error);
    }
  };
  function InititeDelete(event: any) {
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

  if (openMeal) {
    return (
      <div className="meal-item dropbtn">
        <div
          onClick={handleClickMeal}
          className="meal-item__content"
          id={openMeal.meal_id!.toString()}
        >
          <span onClick={InititeDelete} className="material-symbols-outlined">
            delete
          </span>
          <p>אינס׳ {openMeal.insulin}</p>
          <p>סוכ' {openMeal.blood_sugar}</p>
          <p> פחמ׳ {openMeal.carbs}</p>
          <p>{openMeal.time.slice(0, 5)}</p>
        </div>
        {type === "home" && openMeal.opened_to_edit === 1 && (
          <div className="dropdown-content">
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
        )}

        {type === "calendar" && (
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
        )}

        <form
          onSubmit={handleDeleteMeal}
          className="messege_container"
          id={`${openMeal.meal_id}message`}
        >
          <h5>Are you sure you want to delete this meal?</h5>
          <button type="submit">V</button>
          <button onClick={handleCloseForm} type="button">
            X
          </button>
        </form>
      </div>
    );
  } else {
    return <div>hi</div>;
  }
};

export default MealItem;
