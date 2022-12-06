import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FoodListItem } from "./foodListItem/FoodListItem";
import { Food } from '../../features/food/foodModel';

export const FoodList = () => {
  const [foodArray, setFoodArray] = useState<[]>([]);
  const [pickedFoodArray, setPickedFoodArray] = useState<[]>([]);
  const [carbsSum, setCarbsSum] = useState<number>(0)

  async function getFood() {
    try {
      const { data } = await axios.get("/api/food/get-all-food");
      const { result } = data;
      await setFoodArray(result);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log(carbsSum)
  },[pickedFoodArray])

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div dir="rtl" className="foodList">
      {foodArray.map((foodItem:Food) => {
        return <FoodListItem key={foodItem.food_id} foodItem={foodItem} setCarbsSum={setCarbsSum} carbsSum={carbsSum}/>;
      })}
    </div>

  );
};
