import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  carbsCounterSelector,
  resetCarbs,
} from "../../features/carbs/carbsSlice";
import { emptyArray } from "../../features/food/foodArraySlice";
import { useAppDispatch } from "./../../app/hooks";
import { AddMealForm } from './../addMealForm/AddMealForm';

interface HeaderProps {
  headerType: string;
  addMealForm?: boolean;
  setAddMealForm?: Function;
}
export enum DisplaySetting {
    NONE = "none",
    FLEX = "flex",
    BLOCK = "block"
}

const Header: React.FC<HeaderProps> = ({
  headerType,
  addMealForm,
  setAddMealForm,
}) => {
  const carbsCount = useAppSelector(carbsCounterSelector);
  const dispatch = useAppDispatch();
const [display, setDisplay] = useState<string>(DisplaySetting.NONE)

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
      dispatch(emptyArray());
      dispatch(resetCarbs());
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddMeal = () => {
    try {

        setDisplay(DisplaySetting.FLEX);
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
          <button onClick={handleAddMeal}>V</button>
        </div>
      )}

      <AddMealForm displayType={display} setDisplay={setDisplay}/>
    </div>
  );
};

export default Header;
