import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FoodListItem } from "./foodListItem/FoodListItem";
import { Food } from "../../features/food/foodModel";
import { useAppSelector } from "../../app/hooks";
import { foodarraySelector } from "../../features/food/foodArraySlice";
import { userSelector } from "../../features/user/userSlice";

export const FoodList = () => {
  const [allFoodArray, setAllFoodArray] = useState<Food[]>([]);
  const [carbsSum, setCarbsSum] = useState<number>(0);
  const foodArray = useAppSelector(foodarraySelector);
  const [foodFavoritesArray, setFoodFavoritesArray] = useState<Food[]>();
  const [userSearch, setUserSearch] = useState<string>("");

  const user = useAppSelector(userSelector);

  const [userPreference, setUserPreference] = useState<string>();

  useEffect(() => {
    checkUserPreference();
    console.log(userPreference);
  }, []);

  function checkUserPreference() {
    try {
      if (user?.carbs_unit === "portion") {
        setUserPreference("portion");
      } else if (user?.carbs_unit === "gram") {
        setUserPreference("gram");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getFood() {
    try {
      const { data } = await axios.get("/api/food/get-all-food");
      const { result } = data;
      await setAllFoodArray(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserFavorites() {
    try {
      const { data } = await axios.get(
        "/api/user-favorites/get-user-favorites"
      );
      console.log(data);
      const { result } = data;
      setFoodFavoritesArray(result);
    } catch (error) {
      console.error(error);
    }
  }

  const getFoodBySearch = async () => {
    try {
      const { data } = await axios.post("/api/food/get-food-by-search", { userSearch });
      if(!data) throw new Error("couldn't receive data from axios POST '/api/food/get-food-by-search' ");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userSearch!.length <= 0) {
      getUserFavorites();
      getFood();
    } else {
      //TODO: get the food by user's search
      //Get the food by the userSearch
      getFoodBySearch();
    }
  }, [userSearch]);

  return (
    <div dir="rtl" className="foodList">
      <input
        onChange={(e) => setUserSearch(e.target.value)}
        dir="rtl"
        type="text"
        name="searchFood"
        id="searchFood"
        placeholder="חפש"
      />
      {userSearch!.length <= 0 && allFoodArray.map((foodItem: Food) => {
        return <FoodListItem key={foodItem.food_id} foodItem={foodItem} unit={userPreference!} />;
      })}
    </div>
  );

};
