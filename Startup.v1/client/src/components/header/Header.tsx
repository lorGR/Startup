import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  carbsCounterSelector,
  resetCarbs,
} from "../../features/carbs/carbsSlice";
import {
  emptyArray,
  foodarraySelector,
} from "../../features/food/foodArraySlice";
import Hamburger from "../hamburger/Hamburger";
import { useAppDispatch } from "./../../app/hooks";
import { AddMealForm } from "./../addMealForm/AddMealForm";
import axios from "axios";
import { openMealSelector } from "../../features/openMeal/openMealSlice";
import { useNavigate } from "react-router-dom";
import iconPlus from "../../assets/images/header/iconPlus.png";
import fullCheck from "../../assets/images/header/fullCheck.png";
import fullCancel from "../../assets/images/header/fullCancel.png";
import {
  closeOpenMealFromEdit,
  getLastMeal,
} from "../../features/openMeal/openMealAPI";
import calendar from "../../assets/images/navbar/calendar.png";
import apple from "../../assets/images/header/apple.png";
import addItem from "../../assets/images/header/iconItem.png"
import settings from "../../assets/images/header/iconSettings.png"
import dropIcon from "../../assets/images/header/dropIcon.png"
import { updateUser } from "../../features/user/userAPI";
import { userSelector } from './../../features/user/userSlice';

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
  const user = useAppSelector(userSelector)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLastMeal());
  }, []);

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
      console.log("this is after reload");
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddServingsToMeal = async () => {
    try {
      if (openMeal && openMeal.meal_id) {
        const mealId = openMeal.meal_id;
        const { data } = await axios.post(
          "/api/servings/add-servings-to-meal",
          { mealId, foodArray, carbs }
        );
        console.log(data);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseOpenMeal = async () => {
    try {
      const mealId = openMeal?.meal_id;
      if (openMeal && mealId) {
        dispatch(closeOpenMealFromEdit({ mealId }));
        dispatch(emptyArray());
        dispatch(resetCarbs());
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
            <button onClick={handleCloseOpenMeal}>
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
              <button disabled onClick={handleAddServingsToMeal}>
                <img src={fullCheck} alt="Check" />
              </button>
            ) : (
              <button onClick={handleAddServingsToMeal}>
                <img src={fullCheck} alt="Check" />
              </button>
            )}
          </div>

          <div className="circle" onClick={handleAddMealForm}>
            <div className="circle__icon">
              <img src={apple} alt="plus icon" />
              <p>{carbsCount}</p>
            </div>
            <div className="circle__title">
              <p className="circle__title__text circle__title__text--green">
                פחמימות
              </p>
            </div>
          </div>

          <div className="header__actions">
            <button onClick={handleCancelMeal}>
              <img src={fullCancel} alt="Cancel" />
            </button>
          </div>
        </div>
      )}
      {headerType === "calendar" &&
        <div className="header__display" >
          <div className="header__actions">
            <button onClick={handleCloseOpenMeal}>
              <img src={fullCheck} alt="Check" />
            </button>
          </div>
          <div className="circle" onClick={handleAddMealForm}>
            <div className="circle__icon">
              <img src={calendar} alt="plus icon" />
            </div>
            <div className="circle__title">
              <p className="circle__title__text">יומן</p>
            </div>
          </div>
          <div className="header__actions">
            <button>
              <img src={fullCancel} alt="Cancel" />
            </button>
          </div>
        </div>
      }
      {headerType === "newItem" && 
       <div className="header__display">
       <div className="header__actions">
         <button>
           <img src={fullCheck} alt="Check" />
         </button>
       </div>
       <div className="circle">
         <div className="circle__icon">
           <img src={addItem} alt="plus icon" />
         </div>
         <div className="circle__title">
           <p className="circle__title__text">ערוך פריט</p>
         </div>
       </div>
       <div className="header__actions">
         <button>
           <img src={fullCancel} alt="Cancel" />
         </button>
       </div>
     </div>}
     {headerType === "settings" && 
       <div className="header__display">
       <div className="header__actions">
         <button>
           <img src={fullCheck} alt="Check" onClick={() => {
            if (user) {
              dispatch(updateUser({user}))
              navigate("/home")
            }
           }}/>
         </button>
       </div>
       <div className="circle">
         <div className="circle__icon">
           <img src={settings} alt="settings ico" />
         </div>
         <div className="circle__title">
           <p className="circle__title__text">הגדרות</p>
         </div>
       </div>
       <div className="header__actions">
         <button>
           <img src={fullCancel} alt="Cancel" />
         </button>
       </div>
     </div>}
     {headerType === "settings-register" && 
       <div className="header__display">
       <div className="header__actions">
         {/* <button>
           <img src={fullCheck} alt="Check" />
         </button> */}
       </div>
       <div className="circle">
         <div className="circle__icon">
           <img src={settings} alt="settings icon" />
         </div>
         <div className="circle__title">
           <p className="circle__title__text">הרשמה</p>
         </div>
       </div>
       <div className="header__actions">
         {/* <button>
           <img src={fullCancel} alt="Cancel" />
         </button> */}
       </div>
     </div>}
     {headerType === "login" && 
       <div className="header__display">
       <div className="header__actions">
         {/* <button>
           <img src={fullCheck} alt="Check" />
         </button> */}
       </div>
       <div className="circle">
         <div className="circle__icon--big">
           <img src={dropIcon} alt="drop icon" />
         </div>
       </div>
       <div className="header__actions">
         {/* <button>
           <img src={fullCancel} alt="Cancel" />
         </button> */}
       </div>
     </div>}
     {headerType !== "settings-register" && headerType !== "login" ? <Hamburger setShowMenu={setShowMenu!} showMenu={showMenu!} /> : null}
      <AddMealForm displayType={display} setDisplay={setDisplay} />
    </div>
  );
};

export default Header;
