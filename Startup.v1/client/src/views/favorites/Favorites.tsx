import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { UserFavorites } from './../../components/userFavorites/UserFavorites';
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/Menu";

const Favorites = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="favorites">
      <Header headerType="carbsDisplay" setShowMenu={setShowMenu} showMenu={showMenu} />
      <Navbar navbarType="main" />
      <UserFavorites />
      {showMenu && <Menu />}
    </div>
  )
}

export default Favorites