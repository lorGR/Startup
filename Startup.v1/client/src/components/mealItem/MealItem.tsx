import axios from "axios";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { Food } from "../../features/food/foodModel";
import { Meal } from "../../views/home/Home";
import ServingItem from './servingItem/ServingItem';

interface MealItemProps {
  meal: Meal;
  setMeals: CallableFunction
}

const MealItem: React.FC<MealItemProps> = ({ meal, setMeals }) => {
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

  return (
    <div className="meal-item dropbtn">
      <div
        onClick={handleClickMeal}
        className="meal-item__content"
        id={meal.meal_id.toString()}
      >
        <p>אינס׳ {meal.insulin}</p>
        <p> פחמ׳ {meal.carbs}</p>
        <p>{meal.time.slice(0, 5)}</p>
      </div>
      <div className="dropdown-content ">
        {dropDown &&
          mealServings.length > 0 &&
          mealServings.map((mealServ) => {
            return (
              <ServingItem key={mealServ.serving_id} mealServ={mealServ} setMealServings={setMealServings} setMeals={setMeals}/>
            );
          })}
      </div>
    </div>
  );
};

export default MealItem;
