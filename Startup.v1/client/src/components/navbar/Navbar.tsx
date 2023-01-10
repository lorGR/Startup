import { NavLink } from "react-router-dom";

import home from "../../assets/images/navbar/home.png";
import list from "../../assets/images/navbar/list.png";
import favorites from "../../assets/images/navbar/favorites.png";
import graph from "../../assets/images/navbar/graph.png";
import calendar from "../../assets/images/navbar/calendar.png";
import NavItem from "./navItem/NavItem";


interface NavbarProps {
    navbarType: string,
    disabled?: string
}

const Navbar: React.FC<NavbarProps> = ({ navbarType }) => {

    return (
        <div className="navbar">
            {navbarType === "main" &&
                <nav>
                    <NavLink to="/list" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="רשימה" icon={list} name="listIcon"/>
                    </NavLink>
                    <NavLink to="/favorites" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="מועדפים" icon={favorites} name="favoritesIcon"/>
                    </NavLink>
                    <NavLink to="/home" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="בית" icon={home} name="homeIcon"/>
                    </NavLink>
                </nav>
            }
            {navbarType === "calendar" &&
                <nav>
                    <NavLink to="/graph" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="תרשים" icon={graph} name="graphIcon"/>
                    </NavLink>
                    <NavLink to="/calendar">
                        <NavItem text="דו״ח יומי" icon={calendar} name="calendarIcon"/>
                    </NavLink>
                    <NavLink to="/home">
                        <NavItem text="בית" icon={home} name="homeIcon"/>
                    </NavLink>
                </nav>
            }
            {navbarType === "settings" &&
                <nav>
                    <NavLink style={{pointerEvents: 'none'}} to="/subscription" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>
                        <NavItem text="מנויים"/>
                    </NavLink>
                    <NavLink to="/user-information-2">
                        <NavItem text="מעט על עצמי"/>
                    </NavLink>
                    <NavLink to="/user-information-1">
                        <NavItem text="פרטים אישיים"/>
                    </NavLink>
                </nav>
            }
            
        </div>
    )
}

export default Navbar