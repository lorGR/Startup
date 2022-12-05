import { useState } from "react";

interface HeaderProps {
    headerType: string,
    addMealForm?: boolean,
    setAddMealForm?: Function
}

const Header: React.FC<HeaderProps> = ({ headerType, addMealForm, setAddMealForm }) => {

    const handleAddMealForm = () => {
        try {
            setAddMealForm!(!addMealForm);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="header">
            {headerType === "addVals" && <div onClick={handleAddMealForm}>הזן ערכים</div>}
            {headerType === "carbsDisplay" && <div>פחמימות</div>}
        </div>
    )
}

export default Header;