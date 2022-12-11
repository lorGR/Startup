import axios from "axios";
import { stringify } from "querystring";
import React, { useState } from "react";
import { Food } from "../../features/food/foodModel";
import { Meal } from "../../views/home/Home";

interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const [mealServings, setMealServings] = useState<Food[]>([]);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [unitCounter, setUnitCounter] = useState<number>(1);

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

  const handleChangeCounter = async (event: any) => {
    try {
        const buttonValue = event.target.value.toString();
        
        console.log(buttonValue)
      if (buttonValue.search("add") != -1) {
        console.log("add");
        const servingId = event.target.id.replace("add", "");
        console.log(servingId)
        // const {data} = await axios.post("/api/meals/update-meal-serving-amount", {servingId, unitCounter})
      } else if (buttonValue.search("remove") != -1) {
        const servingId = event.target.id.replace("remove", "");
        console.log("remove");
      } else {
        console.log("nope")
      }
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
              <div className="meal-item__serving-item" key={mealServ.food_id}>
                <div>{mealServ.food_name}</div>
                <div>
                  <button onClick={handleChangeCounter} value={`add${mealServ.serving_id}`}>
                    +
                  </button>
                  {unitCounter} {mealServ.unit}
                  <button onClick={handleChangeCounter} value={`remove${mealServ.serving_id}`}>
                    -
                  </button>
                </div>
                <div>ג' {mealServ.carbs}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MealItem;
