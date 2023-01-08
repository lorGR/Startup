import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FoodListItem } from "./foodListItem/FoodListItem";
import { Food } from "../../features/food/foodModel";
import { useAppSelector } from "../../app/hooks";
import { foodarraySelector } from "../../features/food/foodArraySlice";
import { userSelector } from "../../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserFoodListItem } from "./foodListItem/UserFoodListItem";
import { useNavigate } from "react-router-dom";

export const FoodList = () => {
  const [allFoodArray, setAllFoodArray] = useState<Food[]>([]);
  const [userFoodArray, setUserFoodArray] = useState<Food[]>([]);
  const foodArray = useAppSelector(foodarraySelector);
  const [foodFavoritesArray, setFoodFavoritesArray] = useState<Food[]>();
  const [userSearch, setUserSearch] = useState<string>("");

  const user = useAppSelector(userSelector);

  const [userPreference, setUserPreference] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    checkUserPreference();
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
      const { data } = await axios.post("/api/food/get-food-by-search", {
        userSearch,
      });
      if (!data)
        throw new Error(
          "couldn't receive data from axios POST '/api/food/get-food-by-search' "
        );
      const { result } = data;
      setAllFoodArray(result);
    } catch (error) {
      console.error(error);
    }
  };

  async function getUserFood() {
    try {
      const { data } = await axios.get("/api/food/get-user-food");
      const { result } = data;
      console.log(result);
      setUserFoodArray(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userSearch!.length <= 0) {
      getUserFavorites();
      getFood();
      getUserFood();
    } else {
      getFoodBySearch();
    }
  }, [userSearch]);

  return (
    <div dir="rtl" className="foodList">
      <input
        onChange={(e) => setUserSearch(e.target.value)}
        dir="rtl"
        type="text"
        placeholder="חפש"
        className="foodList__search"
      />
      <button
        className="add-food-button"
        onClick={() => {
          navigate("/add-food");
        }}
      >
        +
      </button>
      {allFoodArray.length === 0 ||
        (userFoodArray.length === 0 && (
          <div className="loading">
            <FontAwesomeIcon
              className="fa-spin"
              icon={faSpinner}
              size="3x"
              color="#0f4e9a"
            />
          </div>
        ))}

      {userFoodArray.map((foodItem: Food) => {
        return (
          <UserFoodListItem
            key={foodItem.user_food_id}
            foodItem={foodItem}
            unit={userPreference!}
          />
        );
      })}
      {allFoodArray.map((foodItem: Food) => {
        return (
          <FoodListItem
            key={foodItem.food_id}
            foodItem={foodItem}
            unit={userPreference!}
          />
        );
      })}
    </div>
  );
};
