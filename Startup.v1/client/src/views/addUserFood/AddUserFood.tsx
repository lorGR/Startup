import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface SelectOption {
  value: string,
  size: number
}

const AddUserFood = () => {
  const [portionName, setPortionName] = useState<string>("הגדר מנה");
  const [portionSize, setPortionSize] = useState<number>(100);
  const [calories, setCalories] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([{value:"בסיס", size:100}]);
  const { register, handleSubmit } = useForm();
  const [calculateValues, setCalculateValues] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    try {
      calculateCalories();
    } catch (error) {
      console.error(error);
    }
  }, [carbs, protein, fat]);

  useEffect(()=> {
    if(location.state) getFoodInformation();
  },[])

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
      setCalories(carbs * 4 + protein * 4 + fat * 9);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (info: any, event:any) => {
    event.preventDefault();
    const formData = JSON.stringify(info);
    const size = event.target.elements.size.value
    const { data } = await axios.post("/api/user-food/add-food", {
      formData,
      calories,
      size
    });
    const { result } = data;
    console.log(result)
  };

  function handleAddOption(event:any) {
    try {
      event.preventDefault();
      setSelectOptions([...selectOptions, {value:portionName, size: portionSize}]);
    } catch (error) {
      console.error(error)
    }
  }

  function handleCalc(event:any) {
    try {
      if(event.target.value !== "בסיס") {
        console.log("this is not basis")
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getFoodInformation() {
    try {
      const foodId = location.state.id;
      const {data} = await axios.post("/api/food/get-food-info", {foodId});
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="home">
      <Header headerType="newItem"/>
      <Navbar navbarType="main" disabled={"disabled"}/>
      <div dir="rtl">
        <form onSubmit={handleSubmit(onSubmit)} className="user-food">
          <input
            {...register("foodName")}
            type="text"
            name="foodName"
            placeholder="הזן שם לפריט"
          />
          <select onChange={handleCalc}
            className="user-food__select"
            name="size"
          >
            {selectOptions.map(option => {
              return <option value={option.value}>{option.value}</option>
            })}
          </select>
          <span
            onClick={handleShowAddSelect}
            className="material-symbols-outlined"
          >
            add
          </span>
          <input
            {...register("carbs")}
            onChange={(e) => {
              setCarbs(Number(e.target.value));
            }}
            type="number"
            name="carbs"
            placeholder="פחמימות"
          />
          <input
            {...register("protein")}
            onChange={(e) => {
              setProtein(Number(e.target.value));
            }}
            type="number"
            name="protein"
            placeholder="חלבונים"
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
          />
          <input
            type="number"
            name="calories"
            placeholder="קלוריות"
            value={calories}
          />
          <button type="submit">הוסף אוכל</button>
        </form>
      </div>
      <form onSubmit={handleAddOption} className="add-portion-type">
        <input onChange={(e) => {setPortionName(e.target.value)}} type="text" placeholder="הגדר שם מנה חדשה" />
        <input onChange={(e)=> {setPortionSize(Number(e.target.value))}} type="number" placeholder="הגדר משקל מנה חדשה בגרמים" />
        <button type="submit">שמור מנה</button>
      </form>
    </div>
  );
};

export default AddUserFood;
