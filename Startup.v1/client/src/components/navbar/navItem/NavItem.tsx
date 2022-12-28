interface NavItemProps {
    text: string,
    icon: any,
    name: string,
    active? : string
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, name }) => {

    return (
        <div className="nav-item">
            <h3>{text}</h3>
            <img src={icon} alt={text} className={name} />
        </div>
    )
}

export default NavItem;