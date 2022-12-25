interface HamburgerProps {
    setShowMenu: CallableFunction,
    showMenu: boolean
}

const Hamburger: React.FC<HamburgerProps> = ({ setShowMenu, showMenu }) => {

    const handleOpenMenu = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.nodeName === "DIV") {
            event.target.parentNode.classList.toggle('is-active');
        } else {
            event.target.classList.toggle('is-active');
        }
        setShowMenu!(!showMenu);
    }


    return (
        <div className="menu" onClick={handleOpenMenu}>
            <button className="hamburger" >
                <div className="bar"></div>
            </button>
        </div>
    );
}

export default Hamburger;