import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  carbsCounterSelector,
  resetCarbs,
} from "../../features/carbs/carbsSlice";
import { emptyArray } from "../../features/food/foodArraySlice";
import Hamburger from "../hamburger/Hamburger";
import { useAppDispatch } from "./../../app/hooks";
import { AddMealForm } from "./../addMealForm/AddMealForm";
import iconPlus from "../../assets/images/header/iconPlus.png"
import fullCheck from "../../assets/images/header/fullCheck.png";
import fullCancel from "../../assets/images/header/fullCancel.png";

interface HeaderProps {
  headerType: string;
  setShowMenu?: CallableFunction;
  showMenu?: boolean;
  addMealForm?: boolean;
  setAddMealForm?: Function;
}
export enum DisplaySetting {
  NONE = "none",
  FLEX = "flex",
  BLOCK = "block",
}

const Header: React.FC<HeaderProps> = ({
  headerType,
  addMealForm,
  setAddMealForm,
  setShowMenu,
  showMenu,

}) => {
  const carbsCount = useAppSelector(carbsCounterSelector);
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState<string>(DisplaySetting.NONE);

  const handleAddMealForm = () => {
    try {
      setAddMealForm!(!addMealForm);
      setDisplay(DisplaySetting.FLEX);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelMeal = () => {
    try {
      dispatch(emptyArray());
      dispatch(resetCarbs());
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddMeal = () => {
    try {
      console.log("trying to save serving");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header">
      {headerType === "addVals" && (
        <div className="header__display" onClick={handleAddMealForm}>
          <div className="header__actions">
            <button>
              <img src={fullCheck} alt="Check" />
            </button>
          </div>
          <div className="circle">
            <div className="circle__icon">
              <img src={iconPlus} alt="plus icon" />
            </div>
            <div className="circle__title">
              <p className="circle__title__text">הזן ערכים</p>
            </div>
          </div>
          <div className="header__actions">
            <button>
              <img src={fullCancel} alt="Cancel" />
            </button>
          </div>
        </div>
      )}
      {headerType === "carbsDisplay" && (
        <div className="flex" dir="rtl">
          <button onClick={handleCancelMeal}>X</button>
          <p> {carbsCount} פחמימות</p>
          {carbsCount === 0 ? (
            <button disabled onClick={handleAddMeal}>
              V
            </button>
          ) : (
            <button onClick={handleAddMeal}>V</button>
          )}
        </div>
      )}
      {headerType === "calendar" && <div>יומן</div>}
      <Hamburger setShowMenu={setShowMenu!} showMenu={showMenu!} />
      <AddMealForm
        displayType={display}
        setDisplay={setDisplay}
      />

    </div>
  );
};

export default Header;
