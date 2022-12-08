import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import counterSlice from './../features/counter/counterSlice';
import foodArraySlice from './../features/food/foodArraySlice';
import carbsCounterSlice from './../features/carbs/carbsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterSlice,
    foodArray: foodArraySlice,
    carbsCounter: carbsCounterSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
