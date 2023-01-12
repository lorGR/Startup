import { useEffect, useState } from "react";
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { FoodList } from './../../components/foodList/FoodList';
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import { useAppDispatch } from './../../app/hooks';

const List = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    

    return (
        <div className="list">
            <Header headerType="carbsDisplay" setShowMenu={setShowMenu} showMenu={showMenu} />
            <Navbar navbarType="main" />
            <FoodList />
            {showMenu && <Menu />}
        </div>
    )
}

export default List