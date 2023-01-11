import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Food } from "./../../../features/food/foodModel";
import plus from "../../../assets/images/home/plus.png";
import minus from "../../../assets/images/home/minus.png";
import XLineIcon from "../../../assets/images/home/XLineIcon.png";
import fullCheck from "../../../assets/images/header/fullCheck.png";
import fullCancel from "../../../assets/images/header/fullCancel.png";

interface ServingItemProps {
  mealServ: Food;
  setMealServings: CallableFunction;
  setMeals: CallableFunction;
  date: string;
}

const ServingItem: FC<ServingItemProps> = ({
  mealServ,
  setMealServings,
  setMeals,
  date,
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
      const { allServingsArray } = data;
      if (allServingsArray.length > 0) {
        setMealServings(allServingsArray);
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

  const getMealsByDate = async () => {
    try {
      const { data } = await axios.post("/api/meals/get-meals-by-date", {
        date,
      });
      if (!data)
        throw new Error(
          "Couldn't receive date from axios POST 'get-meals-by-date' "
        );
      const { result } = data;
      setMeals(result);
    } catch (error) {
      console.error(error);
    }
  };

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
      console.log(event.target.id);
      const buttonValue = event.target.id;
      let servingId;
      let amount = mealCarbsUnit;
      const mealId = mealServ.meal_id;
      if (amount) {
        if (buttonValue === "+") {
          servingId = mealServ.serving_id;
          amount++;
          setUnitCounter(amount);
        } else if (buttonValue === "-") {
          servingId = mealServ.serving_id;
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
      const mealId = mealServ.meal_id;
      const { data } = await axios.post("/api/servings/delete-serving-by-id", {
        servingId,
        mealId,
      });
      console.log(data);
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
    <div className="meal-item__serving-item">
      <div>{mealServ.food_name}</div>
      <div className="amountSetter">
        <button
          className="amountSetter__button"
          onClick={handleChangeCounter}
          value={`add${mealServ.serving_id}`}
        >
          <img id="+" src={plus} alt="" />
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
          className="amountSetter__button"
          onClick={handleChangeCounter}
          value={`remove${mealServ.serving_id}`}
        >
          <img id="-" src={minus} alt="" />
        </button>
      </div>

      {mealServ.amount_gram ? (
        <div className="carbs">
          {(mealServ.carbs * mealCarbsUnit!) / 100} ג'
        </div>
      ) : (
        <div className="carbs">ג' {mealServ.carbs_unit * mealCarbsUnit!}</div>
      )}

      <span className="delete" onClick={InititeDelete}>
        <img src={XLineIcon} alt="" />
      </span>

      <form
        onSubmit={handleDeleteServing}
        className="messege_container"
        id={`${mealServ.serving_id}`}
      >
        <h5>את/ה בטוח/ה ששברצונך למחוק פריט זה?</h5>
        <h5>{mealServ.food_name}</h5>
        <div className="messege_container__buttons">
          <button
            className="messege_container__buttons__button"
            onClick={handleCloseForm}
            type="button"
          >
            <img src={fullCancel} alt="" />
          </button>
          <button className="messege_container__buttons__button" type="submit">
            <img src={fullCheck} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServingItem;
