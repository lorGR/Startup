import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FoodListItem } from "./foodListItem/FoodListItem";
import { Food } from '../../features/food/foodModel';
import { useAppSelector } from "../../app/hooks";
import { foodarraySelector } from "../../features/food/foodArraySlice";

export const FoodList = () => {
  const [allFoodArray, setAllFoodArray] = useState<Food[]>([]);
  const [carbsSum, setCarbsSum] = useState<number>(0);
  const foodArray = useAppSelector(foodarraySelector);

  async function getFood() {
    try {
      const { data } = await axios.get("/api/food/get-all-food");
      const { result } = data;
      await setAllFoodArray(result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    
  },[])

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div dir="rtl" className="foodList">
      {allFoodArray.map((foodItem:Food) => {
        return <FoodListItem key={foodItem.food_id} foodItem={foodItem}/>;
      })}
    </div>

  );
};
