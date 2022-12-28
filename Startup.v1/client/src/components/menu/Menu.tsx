import { Link } from "react-router-dom";
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";

const Menu = () => {
  return (
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
  )
}

export default Menu;