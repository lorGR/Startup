import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Menu from "../../components/menu/Menu";
import FoodContainer from "../../components/foodContainer/FoodContainer";

import { Food } from "../../models/Food";

const List = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [foodArray, setFoodArray] = useState<Food[]>([]);

    useEffect(() => {
        getAllFood(setFoodArray);
    },[]);

    return (
        <div className="list">
            {showMenu && <Menu />}
            <Header
                headerType="carbsDisplay"
                setShowMenu={setShowMenu}
                showMenu={showMenu}
            />
            <Navbar navbarType="main" />
            <FoodContainer listItems={foodArray}/>
        </div>
    )
}

export default List;

const getAllFood = async (setter: CallableFunction) => {
    try {
        const { data } = await axios.get('/api/food/get-all-food');
        if(!data) throw new Error("Couldn't receive data from axios GET '/get-add-food' ");
        const { result } = data;
        setter(result);
    } catch (error) {
        console.error(error);
    }
} 