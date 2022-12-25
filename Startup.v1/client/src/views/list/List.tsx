import { useState } from "react";
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { FoodList } from './../../components/foodList/FoodList';
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/Menu";

const List = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [userSearch, setUserSearch] = useState<string>("");

    return (
        <div className="list">
            <Header headerType="carbsDisplay" setShowMenu={setShowMenu} showMenu={showMenu} />
            <Navbar navbarType="main" />
            <input
                onChange={(e) => setUserSearch(e.target.value)}
                dir="rtl"
                type="text"
                name="searchFood"
                id="searchFood"
                placeholder="חפש"
            />
            <FoodList />
            {showMenu && <Menu />}
            {userSearch.length > 0 && <FoodList userSearch={userSearch} />}
        </div>
    )
}

export default List