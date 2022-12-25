import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addMeal, getLastMeal } from "./openMealAPI";
import { Meal } from "./mealModel";

export enum Status {
    LOADING = "loading",
    IDLE = "idle",
    FAILED = "failed"
}

export interface UserState {
    value: Meal | null,
    status: Status
}

const initialState: UserState = {
    value: null,
    status: Status.IDLE
}

export const openMealSlice = createSlice({
    name: 'openMeal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMeal.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(addMeal.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.value = action.payload;
            })
            .addCase(addMeal.rejected, (state) => {
                state.status = Status.FAILED;
            })
            .addCase(getLastMeal.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getLastMeal.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.value = action.payload;
            })
            .addCase(getLastMeal.rejected, (state) => {
                state.status = Status.FAILED;
            })
    }
});

export const openMealSelector = (state: RootState) => state.openMeal.value;
export const openMealStatusSelector = (state: RootState) => state.openMeal.status;

export default openMealSlice.reducer;