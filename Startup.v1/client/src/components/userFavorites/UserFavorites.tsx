import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { FoodListItem } from './../foodList/foodListItem/FoodListItem';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { favoriteFoodarraySelector } from './../../features/favoriteFood/favoriteFoodArraySlice';
import { getAllUserFavoriteFood } from './../../features/favoriteFood/favoriteFoodArrayAPI';
import { userSelector } from '../../features/user/userSlice';

export const UserFavorites = () => {
    const dispatch = useAppDispatch();
    const favoriteFoodArray = useAppSelector(favoriteFoodarraySelector);
    const user = useAppSelector(userSelector);

    useEffect(() => {
        dispatch(getAllUserFavoriteFood())
    },[])

  return (
    <div dir='rtl'>
        {favoriteFoodArray?.map(food => {return (<FoodListItem key={food.food_id} foodItem={food} foodFavoritesArray={favoriteFoodArray} unit={user?.carbs_unit!}/>)})}
    </div>
  )
}
