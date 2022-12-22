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
  const [display, setDisplay] = useState<string>(DisplaySetting.NONE);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleAddMealForm = () => {
    try {
      setAddMealForm!(!addMealForm);
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

      setDisplay(DisplaySetting.FLEX);
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenMenu = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if(event.target.nodeName === "DIV"){
      event.target.parentNode.classList.toggle('is-active');
    } else {
      event.target.classList.toggle('is-active');
    }
    setShowMenu(!showMenu);
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
          {carbsCount === 0 ?
            <button disabled onClick={handleAddMeal}>V</button>
            :
            <button onClick={handleAddMeal}>V</button>
          }
        </div>
      )}
      {headerType === "calendar" &&
        <div>יומן</div>
      }
      <div className="menu" onClick={handleOpenMenu}>
        <button className="hamburger" >
          <div className="bar"></div>
        </button>
      </div>
      <AddMealForm displayType={display} setDisplay={setDisplay} />
    </div>
  );
};

export default Header;
