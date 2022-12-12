import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export interface CarbsGoalState {
    value: number
}

const initialState: CarbsGoalState = {
    value : 200
}

export const carbsGoalSlice = createSlice({
    name: 'carbsGoal',
    initialState,
    reducers: {
        setCarbsGoal: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCarbsGoal } = carbsGoalSlice.actions;

export const carbsGoalSelector = (state: RootState) => state.carbsGoal.value;

export default carbsGoalSlice.reducer;