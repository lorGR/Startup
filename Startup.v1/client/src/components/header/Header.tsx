import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { carbsCounterSelector, resetCarbs } from "../../features/carbs/carbsSlice";
import { empthyArray } from "../../features/food/foodArraySlice";
import { useAppDispatch } from './../../app/hooks';

interface HeaderProps {
  headerType: string;
  addMealForm?: boolean;
  setAddMealForm?: Function;
}

const Header: React.FC<HeaderProps> = ({
  headerType,
  addMealForm,
  setAddMealForm,
}) => {
  const carbsCount = useAppSelector(carbsCounterSelector);
  const dispatch = useAppDispatch();
  const handleAddMealForm = () => {
    try {
      setAddMealForm!(!addMealForm);
    } catch (error) {
      console.error(error);
    }
  };


  const handleCancelMeal = () => {
try {
    //TODO: function should empry the foodArray (redux);
    //TODO: function should delete the meal ???
    dispatch(empthyArray());
    dispatch(resetCarbs());
    window.location.reload();
} catch (error) {
    console.error(error)
}
  }

  return (
    <div className="header">
      {headerType === "addVals" && (
        <div onClick={handleAddMealForm}>הזן ערכים</div>
      )}
      {headerType === "carbsDisplay" && (
        <div className="flex" dir="rtl">
          <button onClick={handleCancelMeal}>X</button>
          <p> {carbsCount} פחמימות</p>
          <button>V</button>
        </div>
      )}
    </div>
  );
};

export default Header;
