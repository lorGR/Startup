import React, { FC } from "react";
import { Food } from "./../../../features/food/foodModel";

interface FoodItemProps {
  foodItem: Food;
  pickedFoodArray: Array<Food>;
  setPickedFoodArray: CallableFunction;
}

export const FoodListItem: FC<FoodItemProps> = ({ foodItem, pickedFoodArray, setPickedFoodArray }) => {
  function handleToggleAddFoodToArray() {
    try {
        setPickedFoodArray((currentState:Food[]) => [...currentState, foodItem]  )
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <input type="checkbox" name="food" id={`${foodItem.food_id}`} />
      <label
        onClick={handleToggleAddFoodToArray}
        className="test"
        htmlFor={`${foodItem.food_id}`}
      >
        <div className="foodList__item">
          <p className="foodList__item__start">{foodItem.food_name}</p>
          <p className="foodList__item__center">{foodItem.unit}</p>
          <p className="foodList__item__end">{foodItem.carbs_unit} גרם</p>
        </div>
      </label>
    </>
  );
};
