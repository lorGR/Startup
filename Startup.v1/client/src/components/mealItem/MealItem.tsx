import axios from "axios";
import React, { useState } from "react";
import { Food } from "../../features/food/foodModel";
import { Meal } from "../../views/home/Home"

interface MealItemProps {
    meal: Meal
}

const MealItem: React.FC<MealItemProps> = ({meal}) => {

    const [mealServings, setMealServings] = useState<Food[]>([]);

    const handleClickMeal = async (event: any) => {
        try {
            event.stopPropagation();
            let mealId = null;
            if(event.target.nodeName === 'P') {
                mealId = event.target.parentNode.id;
            } else {
                mealId = event.target.id;
            }
            const { data } = await axios.post("/api/meals/get-meals-servings", {mealId});
            if(!data) throw new Error("Coudln't receive data from axios POST ON FUNCTION handleClickMeal IN FILE MealItem.tsx ");
            const { result } = data;
            console.log(result);

            console.dir(event.target);

            setMealServings(result);
            // TODO: create dropdown menu when click on meal and render the mealServings
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div onClick={handleClickMeal} className="meal-item dropbtn" id={meal.meal_id.toString()}>
            <p>אינס׳ {meal.insulin}</p>
            <p> פחמ׳ {meal.carbs}</p>
            <p>{meal.time.slice(0, 5)}</p>
            <div className="dropdown-content">
                {mealServings.length > 0 && mealServings.map(mealServ => {
                    return (
                        <div className="meal-item__serving-item" key={mealServ.food_id}>
                            {mealServ.food_name}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default MealItem;