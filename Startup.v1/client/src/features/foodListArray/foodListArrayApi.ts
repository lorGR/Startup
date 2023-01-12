import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllFood = createAsyncThunk(
  "get-all-food-favorite",
  async () => {
    try {
      const { data } = await axios.get(`/api/food/get-all-food-with-favorite`);
      const { foodListArray } = data;
      return foodListArray;
    } catch (error) {
      console.error(error);
    }
  }
);
