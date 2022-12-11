import axios from "axios";
import React from "react";
import { Meal } from "../../views/home/Home"

interface MealItemProps {
    meal: Meal
}

const MealItem: React.FC<MealItemProps> = ({meal}) => {

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
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div onClick={handleClickMeal} className="meal-item" id={meal.meal_id.toString()}>
            <p>אינס׳ {meal.insulin}</p>
            <p> פחמ׳ {meal.carbs}</p>
            <p>{meal.time.slice(0, 5)}</p>
        </div>
    )
}

export default MealItem;