import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddUserFood = () => {
  const [portion, setPortion] = useState<string>("הגדר מנה");
  const [size, setSize] = useState<number>(100);
  const [calories, setCalories] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [selectOptions, setSelectOptions] = useState<string[]>()
  const { register, handleSubmit } = useForm();


  useEffect(() => {
    try {
        calculateCalories();
    } catch (error) {
        console.error(error)
    }
  },[carbs, protein, fat])

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
        setCalories(((carbs*4) + (protein * 4) + (fat * 9)))
    } catch (error) {
      console.error(error);
    }
  }
  
  const onSubmit = async (info: any) => {
    const formData = JSON.stringify(info);
    console.log(formData)
    // const { data } = await axios.post("", {
    //   formData, 
    // });
    // const {result} = data;

  };

  return (
    <div className="add-user-food">
      <Header headerType="addVals"></Header>
      <Navbar navbarType="main"></Navbar>
      <div dir="rtl">
        <form onSubmit={handleSubmit(onSubmit)} className="user-food">
          <input {...register("foodName")} type="text" name="foodName" placeholder="הזן שם לפריט" />
          <select {...register("size")} className="user-food__select" name="size">
            <option value="gram">בסיס</option>
          </select>
          <span
            onClick={handleShowAddSelect}
            className="material-symbols-outlined"
          >
            add
          </span>
          {/* <input
          {...register("size")}
            type="number"
            name="size"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
          /> */}
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
          <input {...register("calories")} type="number" name="calories" placeholder="קלוריות" value={calories}/>
          <button type="submit">הוסף אוכל</button>
        </form>
      </div>

      <form className="add-portion-type">
        <input type="text" placeholder="הגדר שם מנה חדשה" />
        <input type="number" placeholder="הגדר משקל מנה חדשה בגרמים" />
        <button>שמור מנה</button>
      </form>
    </div>
  );
};

export default AddUserFood;
