import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";

interface ServingItemProps {
  mealServ: Food;
  setMealServings: CallableFunction;
  setMeals: CallableFunction;
  date: string
}

const ServingItem: FC<ServingItemProps> = ({
  mealServ,
  setMealServings,
  setMeals,
  date
}) => {
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
      const { result } = data;
      if (result.length > 0) {
        setMealServings(result);
      } 
      // else if (result.length === 0) {
      //   console.log("meal is empty");
      //   const mealId = mealServ.meal_id;
      //   const { data } = await axios.post("/api/meals/delete-meal-by-id", {
      //     mealId
      //   });
        // console.log("this is after delete axios post")
        // console.log(data);
        // const { result } = data;
        // setMeals(result);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  const getMealsByDate =  async () => {
    try {
        const { data } = await axios.post("/api/meals/get-meals-by-date", {date});
        if(!data) throw new Error("Couldn't receive date from axios POST 'get-meals-by-date' ");
        const { result } = data;
        setMeals(result); 
    } catch (error) {
        console.error(error);
    }
}

  function getMealTypeUnit() {
    try {
      if (mealServ.amount_gram) {
        return mealServ.amount_gram;
      } else if (mealServ.amount_portion) {
        return mealServ.amount_portion;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function checkMealAmount() {
    try {
      if (mealServ.amount_gram) {
        setUnitCounter(mealServ.amount_gram);
      } else if (mealServ.amount_portion) {
        setUnitCounter(mealServ.amount_portion);
      }
    } catch (error) {
      console.error(error);
    }
  }
  //TODO: edit servingId = mealServ.serving_id; and edit to make function look better
  const handleChangeCounter = async (event: any) => {
    try {
      const buttonValue = event.target.value.toString();
      let servingId;
      let amount = mealCarbsUnit;
      const mealId = mealServ.meal_id;
      if (amount) {
        if (buttonValue.search("add") != -1) {
          servingId = event.target.value.replace("add", "");
          amount++;
          setUnitCounter(amount);
        } else if (buttonValue.search("remove") != -1) {
          servingId = event.target.value.replace("remove", "");
          amount--;
          setUnitCounter(amount);
          if (amount === 0) {
            InititeDelete();
          }
        } else {
          console.log("nope");
        }
        const { data } = await axios.post(
          "/api/meals/update-meal-serving-amount",
          { servingId, amount, mealId }
        );
        updateMealView();
        // getTodayMeals();
        getMealsByDate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  function handleEnterGram() {
    try {
      const input = document.getElementById(
        `enterGram${mealServ.serving_id}`
      ) as HTMLInputElement;
      input.style.display = "inline";
      const unitCounter = document.querySelector(
        `#unit_counter${mealServ.serving_id}`
      ) as HTMLDivElement;
      unitCounter.style.display = "none";
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event: any) {
    try {
      let amount = event.target.value;
      const mealId = mealServ.meal_id;
      const servingId = mealServ.serving_id;

      if (amount === "") {
        const input = document.getElementById(
          `enterGram${mealServ.serving_id}`
        ) as HTMLInputElement;
        input.style.display = "none";
        const unitCounter = document.querySelector(
          `#unit_counter${mealServ.serving_id}`
        ) as HTMLDivElement;
        unitCounter.style.display = "inline";
        return;
      }
      if (amount == 0) {
        InititeDelete();
        return;
      }
      setUnitCounter(amount);

      const { data } = await axios.post(
        "/api/meals/update-meal-serving-amount",
        { servingId, amount, mealId }
      );
      updateMealView();
      // getTodayMeals();
      getMealsByDate();
      const input = document.getElementById(
        `enterGram${mealServ.serving_id}`
      ) as HTMLInputElement;
      input.style.display = "none";
      const unitCounter = document.querySelector(
        `#unit_counter${mealServ.serving_id}`
      ) as HTMLDivElement;
      unitCounter.style.display = "inline";
    } catch (error) {
      console.error(error);
    }
  }

  function InititeDelete() {
    try {
      const messege = document.getElementById(
        `${mealServ.serving_id}`
      ) as HTMLDivElement;
      messege.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteServing(event: any) {
    try {
      event.preventDefault();
      const servingId = mealServ.serving_id;
      const { data } = await axios.post("/api/servings/delete-serving-by-id", {
        servingId,
      });
      updateMealView();
      // getTodayMeals();
      getMealsByDate();
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseForm = () => {
    try {
      const messege = document.getElementById(
        `${mealServ.serving_id}`
      ) as HTMLDivElement;
      messege.style.display = "none";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="meal-item__serving-item" >
      <div>{mealServ.food_name}</div>
      <div>
        <button
          onClick={handleChangeCounter}
          value={`add${mealServ.serving_id}`}
        >
          +
        </button>

        {mealServ.amount_gram ? (
          <div onClick={handleEnterGram}>
            <input
              className="enterGram"
              onSubmit={handleSubmit}
              onBlur={handleSubmit}
              type="number"
              name="enterGram"
              id={`enterGram${mealServ.serving_id}`}
            />
            <div
              id={`unit_counter${mealServ.serving_id}`}
              className="unit_counter"
            >
              {unitCounter}
            </div>{" "}
            גרם
          </div>
        ) : (
          <div>
            {unitCounter} {mealServ.unit}
          </div>
        )}

        <button
          onClick={handleChangeCounter}
          value={`remove${mealServ.serving_id}`}
        >
          -
        </button>
      </div>

      {mealServ.amount_gram ? (
        <div>{(mealServ.carbs * mealCarbsUnit!) / 100}</div>
      ) : (
        <div>ג' {mealServ.carbs_unit * mealCarbsUnit!}</div>
      )}

      <span onClick={InititeDelete} className="material-symbols-outlined">
        close
      </span>

      <form
        onSubmit={handleDeleteServing}
        className="messege_container"
        id={`${mealServ.serving_id}`}
      >
        <h5>Are you sure you want to delete this item?</h5>
        <h5>{mealServ.food_name}</h5>
        <button type="submit">V</button>
        <button onClick={handleCloseForm} type="button">
          X
        </button>
      </form>
    </div>
  );
};

export default ServingItem;
