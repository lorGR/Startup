import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getUserByCookie, updateUser } from "./userAPI";
import { User } from "./userModel";

export enum Status {
    LOADING = "loading",
    IDLE = "idle",
    FAILED = "failed"
}

export interface UserState {
    value: User | null,
    status: Status
}

const initialState: UserState = {
    value: null,
    status: Status.IDLE
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateFirstName: (state, action) => {
            if( state.value) {
                state.value.first_name = action.payload
            }
        },
        updateLastName: (state, action) => {
            if( state.value) {
                state.value.last_name = action.payload
            }
        },
        updateIdentityNumber: (state, action) => {
            if(state.value) {
                state.value.identity_number = action.payload
            }
        },
        updateGender: (state, action) => {
            if(state.value) {
                state.value.gender = action.payload
            }
        },
        updateBirthDate: (state, action) => {
            if(state.value) {
                state.value.birth_date = action.payload
            }
        },
        updateHeight: (state, action) => {
            if(state.value) {
                state.value.height = action.payload
            }
        },
        updateWeight: (state, action) => {
            if(state.value) {
                state.value.weight = action.payload
            }
        },
        updateDiabetesType: (state, action) => {
            if(state.value) {
                state.value.diabetes_type = action.payload
            }
        },
        updateHmo: (state, action) => {
            if(state.value) {
                state.value.hmo = action.payload
            }
        },
        updateBalanceMin: (state, action) => {
            if(state.value) {
                state.value.balance_min = action.payload
            }
        },
        updateBalanceMax: (state, action) => {
            if(state.value) {
                state.value.balance_max = action.payload
            }
        },
        updateCarbsUnit: (state, action) => {
            if(state.value) {
                state.value. carbs_unit = action.payload
            }
        },
        updateProteinCalc: (state, action) => {
            if(state.value) {
                state.value.protein_calc = action.payload
            }
        },
        updateProfileImage: (state, action) => {
            if(state.value) {
                state.value.profile_image = action.payload
            }
        },
        updateCarbsGoal: (state, action) => {
            if(state.value) {
                state.value.carbs_goal = action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByCookie.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getUserByCookie.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.value = action.payload;
            })
            .addCase(getUserByCookie.rejected, (state) => {
                state.status = Status.FAILED;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.value = action.payload;
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = Status.FAILED;
            })
    }
});

export const userSelector = (state: RootState) => state.user.value;
export const userStatusSelector = (state: RootState) => state.user.status;

export default userSlice.reducer;