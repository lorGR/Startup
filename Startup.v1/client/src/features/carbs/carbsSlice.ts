import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CarbsCounterState {
  value: number;
}

const initialState: CarbsCounterState = {
  value: 0,
};

export const carbsCounterSlice = createSlice({
  name: "carbsCounter",
  initialState,
  reducers: {
    addCarbs: (state, action) => {
      state.value += action.payload;
      // function calc(currentValue:number): number {
      //     return currentValue + action.payload
      // }
      // state.value = calc(state.value);
      // state.value = (currentValue:number): number => {
      //     return currentValue + action.payload
      // }
      //TODO: figure out how to make this in a function to prevenet mushed states
    },
    removeCarbs: (state, action) => {
      state.value -= action.payload;
    },
    resetCarbs: (state) => {
      state.value = initialState.value
    }
  },
});

export const { addCarbs, removeCarbs, resetCarbs } = carbsCounterSlice.actions;
export const carbsCounterSelector = (state: RootState) =>
  state.carbsCounter.value;

export default carbsCounterSlice.reducer;
