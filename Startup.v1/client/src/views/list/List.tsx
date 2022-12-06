import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { FoodList } from './../../components/foodList/FoodList';

const List = () => {
    return (
        <div className="list">
            <Header headerType="carbsDisplay" />
            <Navbar navbarType="main"/>
            <FoodList/>
        </div>
    )
}

export default List