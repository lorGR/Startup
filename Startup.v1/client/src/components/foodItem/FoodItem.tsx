import { Food } from "../../models/Food";

interface FoodItemProps {
    item: Food
}

const FoodItem: React.FC<FoodItemProps> = ({ item }) => {

    const handleAddItem = () => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div
            id={item.food_id.toString()}
            onClick={handleAddItem}
        >
            <span>{item.food_name} </span>
            <span>{item.carbs_unit} </span>
            <span>{item.carbs} </span>
        </div>
    )
}

export default FoodItem;