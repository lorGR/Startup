import { Food } from "../../models/Food";
import FoodItem from "../foodItem/FoodItem";

interface FoodContainerProps {
    listItems: Array<Food>
}

const FoodContainer: React.FC<FoodContainerProps> = ({ listItems }) => {
    return (
        <div>
            {listItems.map((item) => <FoodItem item={item} />)}
        </div>
    )
}

export default FoodContainer;