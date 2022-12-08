import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Food } from './foodModel';

export interface FoodArrayState {
    value: Food[];
}

const initialState:FoodArrayState = {
    value: []
}

export const foodArraySlice = createSlice({
    name:"foodArray",
    initialState,
    reducers: {
        addFood: (state, action) => {
            state.value.push(action.payload)
        },
        removeFood: (state, action) => {
            state.value = action.payload;
        },
        empthyArray: (state) => {
            state.value = initialState.value;
        }
    }
});

export const {addFood, removeFood, empthyArray} = foodArraySlice.actions;
export const foodarraySelector = (state:RootState) => state.foodArray.value;

export default foodArraySlice.reducer;