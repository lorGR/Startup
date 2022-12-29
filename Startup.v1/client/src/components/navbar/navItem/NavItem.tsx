interface NavItemProps {
    text: string,
    icon: any,
    name: string,
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, name }) => {

    return (
        <div className="nav-item">
            <p>{text}</p>
            <img src={icon} alt={text} className={name} />
        </div>
    )
}

export default NavItem;