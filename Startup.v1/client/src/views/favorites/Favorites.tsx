import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { UserFavorites } from './../../components/userFavorites/UserFavorites';
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="favorites">
        <Header headerType="carbsDisplay" setShowMenu={setShowMenu} showMenu={showMenu}/>
        <Navbar navbarType="main"/>
        <UserFavorites/>
        {showMenu &&
        <div className="menu-screen">
          <div className="menu__logo">
            <img src={sugarbitHeader} alt="sugar-bit-header" id="header" />
          </div>
          <div className="menu__items">
            <Link to="/calendar">יומן</Link>
            <Link to="/home">בית</Link>
            <Link to="">תזכורן</Link>
            <Link to="">דוחות</Link>
            <Link to="">הגדרות</Link>
            <Link to="">שתף</Link>
            <Link to="">מד סוכר</Link>
            <Link to="">הדרכות</Link>
          </div>
        </div>
      }
    </div>
  )
}

export default Favorites