import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  carbsCounterSelector,
  resetCarbs,
} from "../../features/carbs/carbsSlice";
import { emptyArray, foodarraySelector } from "../../features/food/foodArraySlice";
import Hamburger from "../hamburger/Hamburger";
import { useAppDispatch } from "./../../app/hooks";
import { AddMealForm } from "./../addMealForm/AddMealForm";
import axios from 'axios';
import { openMealSelector } from "../../features/openMeal/openMealSlice";
import { useNavigate } from 'react-router-dom';
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
  const [display, setDisplay] = useState<string>(DisplaySetting.NONE);
  const openMeal = useAppSelector(openMealSelector);
  const foodArray = useAppSelector(foodarraySelector);
  const carbs = useAppSelector(carbsCounterSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


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
  const handleAddMeal = async () => {
    try {
      if (openMeal && openMeal.meal_id) {
        const mealId = openMeal.meal_id;
        const { data } = await axios.post("/api/servings/add-servings-to-meal", { mealId, foodArray, carbs });
        console.log(data);
        navigate("/home")
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header">
      {headerType === "addVals" && (
        <div className="header__display">
          <div className="header__actions">
            <button>
              <img src={fullCheck} alt="Check" />
            </button>
          </div>
          <div className="circle" onClick={handleAddMealForm}>
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
        <div className="header__display">

          <div className="header__actions">
            {carbsCount === 0 ? (
              <button disabled onClick={handleAddMeal}>
                <img src={fullCheck} alt="Check" />
              </button>
            ) : (
              <button onClick={handleAddMeal}>
                <img src={fullCheck} alt="Check" />
              </button>
            )}
          </div>

          <div className="circle" onClick={handleAddMealForm}>
            <div className="circle__icon">
              <img src={iconPlus} alt="plus icon" />
              <p>{carbsCount}</p>
            </div>
            <div className="circle__title">
              <p className="circle__title__text">פחמימות</p>
            </div>
          </div>

          <div className="header__actions">
            <button onClick={handleCancelMeal}>
              <img src={fullCancel} alt="Cancel" />
            </button>
          </div>
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
