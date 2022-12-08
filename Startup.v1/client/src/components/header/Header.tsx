import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { carbsCounterSelector } from "../../features/carbs/carbsSlice";

interface HeaderProps {
    headerType: string,
    addMealForm?: boolean,
    setAddMealForm?: Function
}

const Header: React.FC<HeaderProps> = ({ headerType, addMealForm, setAddMealForm }) => {
    const carbsCount = useAppSelector(carbsCounterSelector)
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
            {headerType === "carbsDisplay" && <div dir="rtl"> {carbsCount} פחמימות  </div>}
        </div>
    )
}

export default Header;