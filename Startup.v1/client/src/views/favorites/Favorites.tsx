import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { UserFavorites } from './../../components/userFavorites/UserFavorites';

const Favorites = () => {
  return (
    <div className="favorites">
        <Header headerType="carbsDisplay"/>
        <Navbar navbarType="main"/>
        <UserFavorites/>
    </div>
  )
}

export default Favorites