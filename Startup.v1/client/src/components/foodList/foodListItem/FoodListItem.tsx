import React, { FC } from "react";

interface FoodItemProps {
  foodItem: any;
}

export const FoodListItem: FC<FoodItemProps> = ({ foodItem }) => {
  return (
    <>
      <input type="checkbox" name="food" id={foodItem.food_id} />
      <label className="test" htmlFor={foodItem.food_id}>
        <div className="foodList__item">
          <p className="foodList__item__start">{foodItem.food_name}</p>
          <p className="foodList__item__center">{foodItem.unit}</p>
          <p className="foodList__item__end">{foodItem.carbs_unit} גרם</p>
        </div>
      </label>
    </>
  );
};
