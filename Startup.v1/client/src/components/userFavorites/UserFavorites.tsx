import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Food } from './../../features/food/foodModel';
import { FoodListItem } from './../foodList/foodListItem/FoodListItem';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import favoriteFoodArraySlice, { favoriteFoodarraySelector } from './../../features/favoriteFood/favoriteFoodArraySlice';
import { getAllUserFavoriteFood } from './../../features/favoriteFood/favoriteFoodArrayAPI';

export const UserFavorites = () => {
    const [foodFavoritesArray,setFoodFavoritesArray] = useState<Food[]>()
    const dispatch = useAppDispatch();
    const favoriteFoodArray = useAppSelector(favoriteFoodarraySelector);

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
        // getUserFavorites();
        dispatch(getAllUserFavoriteFood())
    },[])

  return (
    <div dir='rtl'>
        {favoriteFoodArray?.map(food => {return (<FoodListItem key={food.food_id} foodItem={food} foodFavoritesArray={foodFavoritesArray} unit={"portion"}/>)})}
    </div>
  )
}
