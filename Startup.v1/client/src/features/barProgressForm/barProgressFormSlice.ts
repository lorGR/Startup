import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DisplaySetting } from "../../components/header/Header";

export interface BarProgressForm {
    displayType : DisplaySetting
}

const initialState: BarProgressForm = {
    displayType: DisplaySetting.NONE
}

export const barProgressForm = createSlice({
    name: "barProgressForm",
    initialState,
    reducers: {
        setBarProgressFormDisplay: (state, action) => {
            state.displayType = action.payload;
        }
    }
});

export const { setBarProgressFormDisplay } = barProgressForm.actions;

export const barProgressFormSelector = (state: RootState) => state.barProgressForm.displayType;

export default barProgressForm.reducer;