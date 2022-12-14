import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFoodToUserFavorites = createAsyncThunk(
  "add-food-to-user-favorite",
  async ({ foodId }: { foodId: number }) => {
    try {
      const { data } = await axios.post(
        `/api/user-favorites/add-to-favorites`,
        { foodId }
      );
      const { result } = data;
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeFoodToUserFavorite = createAsyncThunk(
  "remove-food-to-user-favorite",
  async ({ foodId }: { foodId: number }) => {
    try {
      const { data } = await axios.post(
        "/api/user-favorites/delete-from-favorites",
        { foodId }
      );
      const { result } = data;
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllUserFavoriteFood = createAsyncThunk("get-all-food", async () => {
  try {
    const { data } = await axios.get("/api/user-favorites/get-user-favorites");
    const { result } = data;
    return result;
  } catch (error) {
    console.error(error);
  }
});

export const getUserFavoritesFoodBySearch = createAsyncThunk("get-favorite-food-by-search", async ({ userSearch }: { userSearch: string }) => {
  try {
    const { data } = await axios.post("/api/user-favorites/get-user-favorites-by=search", { userSearch });
    if (!data) throw new Error("Couldn't receive data from axios POST 'get-user-favorites-by=search'");
    const { result } = data;
    return result;
  } catch (error) {
    console.error(error);
  }
})
