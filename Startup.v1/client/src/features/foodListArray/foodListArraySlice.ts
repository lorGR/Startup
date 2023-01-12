import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Food } from '../food/foodModel';
import { getAllFood } from './foodListArrayApi';
import { Status } from "../user/userSlice";

export interface FavoriteFoodArrayState {
    value: Food[];
    status:Status
}

const initialState:FavoriteFoodArrayState = {
    value: [],
    status: Status.IDLE
}

export const foodListArraySlice = createSlice({
    name:"foodListArray",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllFood.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getAllFood.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload;
        })
        .addCase(getAllFood.rejected, (state) => {
            state.status = Status.FAILED
        })
    }
});

export const foodListArraySelector = (state:RootState) => state.foodListArray.value;

export default foodListArraySlice.reducer;