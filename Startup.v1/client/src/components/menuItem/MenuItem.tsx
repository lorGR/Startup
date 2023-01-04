import { Link } from "react-router-dom";

interface MenuItemProps {
    link: string,
    icon: any,
    text: string
}

const MenuItem: React.FC<MenuItemProps> = ({link, icon, text}) => {
  return (
    <Link to={link}>
        <div className="menu-item">
            <img src={icon} alt={text} />
            <p>{text}</p>
        </div>
    </Link>
  )
}

export default MenuItem;