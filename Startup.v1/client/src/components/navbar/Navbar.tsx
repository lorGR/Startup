import { NavLink } from "react-router-dom";

import home from "../../assets/images/navbar/home.png";
import list from "../../assets/images/navbar/list.png";
import favorites from "../../assets/images/navbar/favorites.png";
import NavItem from "./navItem/NavItem";

interface NavbarProps {
    navbarType: string,
    activeNav?: string,
}

const Navbar: React.FC<NavbarProps> = ({ navbarType, activeNav }) => {

    return (
        <div className="navbar">
            {navbarType === "main" &&
                <nav>
                    <NavLink to="/list" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="רשימה" icon={list} name="listIcon" active={activeNav} />
                    </NavLink>
                    <NavLink to="/favorites" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="מועדפים" icon={favorites} name="favoritesIcon" active={activeNav} />
                    </NavLink>
                    <NavLink to="/home" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="בית" icon={home} name="homeIcon" active={activeNav} />
                    </NavLink>
                </nav>
            }
            {navbarType === "calendar" &&
                <nav>
                    <NavLink to="/graph">
                        תרשים
                    </NavLink>
                    <NavLink to="/calendar">
                        דו״ח יומי
                    </NavLink>
                    <NavLink to="/home">
                        בית
                    </NavLink>
                </nav>
            }
        </div>
    )
}

export default Navbar