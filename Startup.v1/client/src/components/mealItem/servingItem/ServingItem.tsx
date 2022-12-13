import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";

interface ServingItemProps {
  mealServ: Food;
  setMealServings: CallableFunction;
  setMeals: CallableFunction
}

const ServingItem: FC<ServingItemProps> = ({ mealServ, setMealServings, setMeals }) => {
  const [unitCounter, setUnitCounter] = useState<number>(1);
  const mealCarbsUnit = getMealTypeUnit();

  useEffect(() => {
    checkMealAmount();
  }, []);

  async function updateMealView() {
    try {
      const mealId = mealServ.meal_id;

      const { data } = await axios.post("/api/meals/get-meals-servings", {
        mealId,
      });
      const {result} = data;
      setMealServings(result)
    } catch (error) {
      console.error(error);
    }
  }

  const getTodayMeals = async () => {
    try {
      const { data } = await axios.get("/api/meals/get-today-meals");
      if (!data) throw new Error("Couldn't receive data from axios GET '/api/meals/get-today-meals' ON FUNCTION getTodayMeals ON FILE Home.tsx ");
      const { result } = data;
      setMeals(result);
    } catch (error) {
      console.error(error);
    }
  }

  function getMealTypeUnit() {
    try {
      if(mealServ.amount_gram) {
        return mealServ.amount_gram;
      } else if (mealServ.amount_portion) {
        return mealServ.amount_portion;
      }
    } catch (error) {
      console.error(error)
    }
  }

  function checkMealAmount() {
    try {
      if(mealServ.amount_gram) {
        setUnitCounter(mealServ.amount_gram);
      } else if (mealServ.amount_portion) {
        setUnitCounter(mealServ.amount_portion)
      }
     
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeCounter = async (event: any) => {
    try {
      const buttonValue = event.target.value.toString();
      let servingId;
      let amount = mealCarbsUnit;
      const mealId = mealServ.meal_id
      if (amount) {
        if (buttonValue.search("add") != -1) {
          servingId = event.target.value.replace("add", "");
          amount++;
          setUnitCounter(amount);
        } else if (buttonValue.search("remove") != -1) {
          servingId = event.target.value.replace("remove", "");
          amount--;
          setUnitCounter(amount);
        } else {
          console.log("nope");
        }
        const { data } = await axios.post(
          "/api/meals/update-meal-serving-amount",
          { servingId, amount, mealId }
        );
        updateMealView();
        getTodayMeals();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="meal-item__serving-item" key={mealServ.food_id}>
      <div>{mealServ.food_name}</div>
      <div>
        <button
          onClick={handleChangeCounter}
          value={`add${mealServ.serving_id}`}
        >
          +
        </button>
        {unitCounter} {mealServ.unit}
        <button
          onClick={handleChangeCounter}
          value={`remove${mealServ.serving_id}`}
        >
          -
        </button>
      </div>
      <div>ג' {mealServ.carbs_unit * mealCarbsUnit!}</div>
    </div>
  );
};

export default ServingItem;
