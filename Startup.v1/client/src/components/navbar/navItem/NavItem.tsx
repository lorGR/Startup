interface NavItemProps {
    text: string,
    icon?: any,
    name?: string,
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, name }) => {

    return (
        <div className="nav-item">
            <p>{text}</p>
           {icon ? <img src={icon} alt={text} className={name} /> : null} 
        </div>
    )
}

export default NavItem;