import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";

interface ServingItemProps {
  mealServ: Food;
  setMealServings: CallableFunction;
}

const ServingItem: FC<ServingItemProps> = ({ mealServ, setMealServings }) => {
  const [unitCounter, setUnitCounter] = useState<number>(1);

  useEffect(() => {
    checkMealAmount();
    console.log("check loop");
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

  function checkMealAmount() {
    try {
      if (mealServ.amount) setUnitCounter(mealServ.amount);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeCounter = async (event: any) => {
    try {
      const buttonValue = event.target.value.toString();
      let servingId;
      let amount = mealServ.amount;
      console.log("amount 1");
      console.log(amount);
      if (amount) {
        console.log("entered if amount exist");
        if (buttonValue.search("add") != -1) {
          servingId = event.target.value.replace("add", "");
          amount++;
          console.log("amount 2");
          console.log(amount);
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
          { servingId, amount }
        );
        console.log(data);
        updateMealView();
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
      <div>ג' {mealServ.carbs}</div>
    </div>
  );
};

export default ServingItem;
