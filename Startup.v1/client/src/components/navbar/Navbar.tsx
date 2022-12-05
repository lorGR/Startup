import { Link, NavLink } from "react-router-dom"

interface NavbarProps {
    navbarType: string,
}

const Navbar: React.FC<NavbarProps> = ({ navbarType }) => {
    return (
        <div className="navbar">
            {navbarType === "main" && 
                <nav>
                    <NavLink to="/list">רשימה</NavLink>
                    <NavLink to="/favorites">מועדפים</NavLink>
                    <NavLink to="/home">בית</NavLink>
                </nav>
            }
        </div>
    )
}

export default Navbar