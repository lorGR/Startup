import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Food } from './../../features/food/foodModel';
import { FoodListItem } from './../foodList/foodListItem/FoodListItem';

export const UserFavorites = () => {
    const [foodFavoritesArray,setFoodFavoritesArray] = useState<Food[]>()

    async function getUserFavorites() {
        try {
            const {data} = await axios.get("/api/user-favorites/get-user-favorites");
            console.log(data)
            const {result} = data;
            setFoodFavoritesArray(result);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserFavorites();
    },[])

  return (
    <div dir='rtl'>
        {foodFavoritesArray?.map(food => {return (<FoodListItem key={food.food_id} foodItem={food} foodFavoritesArray={foodFavoritesArray}/>)})}
    </div>
  )
}
