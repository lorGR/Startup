import React from "react";
import { Meal } from "../../views/home/Home"

interface MealItemProps {
    meal: Meal
}

const MealItem: React.FC<MealItemProps> = ({meal}) => {

    const handleClickMeal = (event: any) => {
        try {
            event.stopPropagation();
            console.dir(event.target.id);
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