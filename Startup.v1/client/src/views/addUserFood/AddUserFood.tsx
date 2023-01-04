import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Food } from "./../../features/food/foodModel";

interface SelectOption {
  value: string;
  size: number;
  name: string;
}

const AddUserFood = () => {
  const [portionName, setPortionName] = useState<string>("הגדר מנה");
  const [portionSize, setPortionSize] = useState<number>(100);
  const [calories, setCalories] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([
    { value: "בסיס-100", size: 100, name: "בסיס" },
  ]);
  const { register, handleSubmit } = useForm();
  const [calculateValues, setCalculateValues] = useState<boolean>(false);
  const location = useLocation();
  const [foodItem, setFoodItem] = useState<Food>();
  const [sendNewFood, setSendNewFood] = useState<boolean>(false)

  useEffect(() => {
    try {
      calculateCalories();
    } catch (error) {
      console.error(error);
    }
  }, [carbs, protein, fat]);

  useEffect(() => {
    if (location.state) {
      getFoodInformation();
    }
  }, []);

  useEffect(() => {
    handleSubmit(onSubmit)
  },[sendNewFood])

  function handleShowAddSelect() {
    try {
      const formPortionType = document.querySelector(
        ".add-portion-type"
      ) as HTMLDivElement;
      formPortionType.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }

  function calculateCalories() {
    try {
      console.log("trying to calculate");
      setCalories(carbs * 4 + protein * 4 + fat * 9);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (info: any, event: any) => {
    event.preventDefault();
    const formData = JSON.stringify(info);
    const size = event.target.elements.size.value;
    const { data } = await axios.post("/api/user-food/add-food", {
      formData,
      calories,
      size,
    });
    const { result } = data;
    console.log(result);
  };

  function handleAddOption(event: any) {
    try {
      event.preventDefault();
      setSelectOptions([
        ...selectOptions,
        {
          value: `${portionName}-${portionSize}`,
          size: portionSize,
          name: portionName,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCalc(event: any) {
    try {
      if (event.target.value !== "בסיס-100") {
        console.log("this is not basis");
        const result = event.target.value.split("-");

        const carbs = document.getElementById("carbs") as HTMLInputElement;
        const protein = document.getElementById("protein") as HTMLInputElement;
        const fat = document.getElementById("fat") as HTMLInputElement;
        const calories = document.getElementById(
          "calories"
        ) as HTMLInputElement;

        carbs.value = `${calcCaloriesPerGram(result[1], 4)}`;
        protein.value = `${calcCaloriesPerGram(result[1], 4)}`;
        fat.value = `${calcCaloriesPerGram(result[1], 9)}`;
        // calories.value = result[0].calories;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function calcCaloriesPerGram(amount: number, calories: number) {
    try {
      if (foodItem) {
        const portionAmount = (amount * foodItem?.carbs) / 100;
        return portionAmount * calories;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getFoodInformation() {
    try {
      const foodId = location.state.id;
      const { data } = await axios.post("/api/food/get-food-info", { foodId });
      const { result } = data;
      const foodName = document.getElementById("foodName") as HTMLInputElement;
      const carbs = document.getElementById("carbs") as HTMLInputElement;
      const protein = document.getElementById("protein") as HTMLInputElement;
      const fat = document.getElementById("fat") as HTMLInputElement;
      const calories = document.getElementById("calories") as HTMLInputElement;

      foodName.value = result[0].food_name;
      carbs.value = result[0].carbs;
      setCarbs(result[0].carbs);
      protein.value = result[0].protein;
      setProtein(result[0].protein);
      fat.value = result[0].fat;
      setFat(result[0].fat);
      calories.value = result[0].calories;

      setFoodItem(result[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="home">
      <Header headerType="newItem"/>
      <Navbar navbarType="main" disabled={"disabled"} />
      <div className="add-food" dir="rtl">
        <form onSubmit={handleSubmit(onSubmit)} className="add-food__user-food">
          <input
            {...register("foodName")}
            type="text"
            name="foodName"
            placeholder="הזן שם לפריט"
            id="foodName"
            className="foodName"
          />
          <div className="add-food__user-food__inputs">
            <div className="add-food__user-food__inputs__right">
              <select
                onChange={handleCalc}
                className="add-food__user-food__inputs__right__select"
                name="size"
              >
                {selectOptions.map((option) => {
                  return (
                    <option value={`${option.value}-${option.size}`}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
              <span
                onClick={handleShowAddSelect}
                className="material-symbols-outlined"
              >
                add
              </span>
            </div>
            <div className="add-food__user-food__inputs__left">
              <input
                {...register("carbs")}
                onChange={(e) => {
                  setCarbs(Number(e.target.value));
                }}
                type="number"
                name="carbs"
                placeholder="פחמימות"
                id="carbs"
                className="small_input"
              />
              <input
                {...register("protein")}
                onChange={(e) => {
                  setProtein(Number(e.target.value));
                }}
                type="number"
                name="protein"
                placeholder="חלבונים"
                id="protein"
                className="small_input"
              />
              <input
                {...register("fat")}
                onChange={(e) => {
                  setFat(Number(e.target.value));
                  calculateCalories();
                }}
                type="number"
                name="fat"
                placeholder="שומנים"
                id="fat"
                className="small_input"
              />
              <input
                type="number"
                name="calories"
                placeholder="קלוריות"
                value={calories}
                id="calories"
                className="small_input"
              />
            </div>
          </div>
          <button type="submit">הוסף אוכל</button>
        </form>
      </div>
      <form onSubmit={handleAddOption} className="add-portion-type">
        <input
          onChange={(e) => {
            setPortionName(e.target.value);
          }}
          type="text"
          placeholder="הגדר שם מנה חדשה"
        />
        <input
          onChange={(e) => {
            setPortionSize(Number(e.target.value));
          }}
          type="number"
          placeholder="הגדר משקל מנה חדשה בגרמים"
        />
        <button type="submit">שמור מנה</button>
      </form>
    </div>
  );
};

export default AddUserFood;
