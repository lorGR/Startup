import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FoodListItem } from './../foodList/foodListItem/FoodListItem';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { favoriteFoodarraySelector } from './../../features/favoriteFood/favoriteFoodArraySlice';
import { getAllUserFavoriteFood, getUserFavoritesFoodBySearch } from './../../features/favoriteFood/favoriteFoodArrayAPI';
import { userSelector } from '../../features/user/userSlice';

export const UserFavorites = () => {
  const dispatch = useAppDispatch();
  const favoriteFoodArray = useAppSelector(favoriteFoodarraySelector);
  const user = useAppSelector(userSelector);
  const [userSearch, setUserSearch] = useState<string>("");

  useEffect(() => {
    if (userSearch.length <= 0) {
      dispatch(getAllUserFavoriteFood());
    } else {
      dispatch(getUserFavoritesFoodBySearch({ userSearch }));
    }
  }, [userSearch]);

  return (
    <div dir='rtl' className='foodList-favorites'>
      <input
        onChange={(e) => setUserSearch(e.target.value)}
        dir="rtl"
        type="text"
        name="searchFood"
        id="searchFood"
        placeholder="חפש"
      />
      {favoriteFoodArray?.map(food => { return (<FoodListItem key={food.food_id} foodItem={food} foodFavoritesArray={favoriteFoodArray} unit={user?.carbs_unit!} />) })}
    </div>
  );
}
