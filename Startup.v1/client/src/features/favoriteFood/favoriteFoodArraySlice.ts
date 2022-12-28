import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Food } from '../food/foodModel';
import { getAllUserFavoriteFood, addFoodToUserFavorites, removeFoodToUserFavorite, getUserFavoritesFoodBySearch } from './favoriteFoodArrayAPI';
import { Status } from "../user/userSlice";

export interface FavoriteFoodArrayState {
    value: Food[];
    status:Status
}

const initialState:FavoriteFoodArrayState = {
    value: [],
    status: Status.IDLE
}

export const favoriteFoodArraySlice = createSlice({
    name:"favoriteFoodArray",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllUserFavoriteFood.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getAllUserFavoriteFood.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
        })
        .addCase(getAllUserFavoriteFood.rejected, (state) => {
            state.status = Status.FAILED
        })
        .addCase(addFoodToUserFavorites.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(addFoodToUserFavorites.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
        })
        .addCase(addFoodToUserFavorites.rejected, (state) => {
            state.status = Status.FAILED
        })
        .addCase(removeFoodToUserFavorite.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(removeFoodToUserFavorite.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
        })
        .addCase(removeFoodToUserFavorite.rejected, (state) => {
            state.status = Status.FAILED;
        })
        .addCase(getUserFavoritesFoodBySearch.pending, (state) => {
            state.status = Status.LOADING;
        })
        .addCase(getUserFavoritesFoodBySearch.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
        })
        .addCase(getUserFavoritesFoodBySearch.rejected, (state) => {
            state.status = Status.FAILED;
        })
    }
});

export const favoriteFoodarraySelector = (state:RootState) => state.favoriteFoodArray.value;

export default favoriteFoodArraySlice.reducer;