
interface HeaderProps {
    headerType: string
}

const Header: React.FC<HeaderProps> = ({ headerType }) => {

    return (
        <div className="header">
            {headerType === "addVals" && <div>הזן ערכים</div>}
            {headerType === "carbsDisplay" && <div>פחמימות</div>}  
        </div>
    )
}

export default Header;