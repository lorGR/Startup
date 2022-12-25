import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  barProgressFormSelector,
  setBarProgressFormDisplay,
} from "../../features/barProgressForm/barProgressFormSlice";
import { userSelector } from "../../features/user/userSlice";
import { Meal } from "../../features/openMeal/mealModel";
import { DisplaySetting } from "../header/Header";
import { getUserByCookie } from "./../../features/user/userAPI";

interface ProgressBarProps {
  meals: Array<Meal>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ meals }) => {
  const dispatch = useAppDispatch();
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [barPrecentages, setBarPrecentages] = useState<number>(0);

  const [barPrecentagesWhatEver, setBarPrecentagesWhatEver] =
    useState<number>(0);

  const barProgressFormDisplay = useAppSelector(barProgressFormSelector);
  // useEffect(() => {
  //     dispatch(getUserByCookie());
  // },[])
  const user = useAppSelector(userSelector);
  // let carbsGoal:number;
  // if(user !== null) {
  //     carbsGoal = user!.carbs_goal;
  // }

  const getTotalCarbs = () => {
    try {
      let myCarbs = 0;
      meals.forEach((meal) => {
        myCarbs += meal.carbs;
      });
      setTotalCarbs(myCarbs);
      setBarPrecentages(Math.round((myCarbs * 100) / user?.carbs_goal!));
      if (Math.round((myCarbs * 100) / user?.carbs_goal!) > 100) {
        setBarPrecentagesWhatEver(100);
      } else {
        setBarPrecentagesWhatEver(
          Math.round((myCarbs * 100) / user?.carbs_goal!)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenProgressForm = () => {
    try {
      if (barProgressFormDisplay === "none") {
        dispatch(setBarProgressFormDisplay(DisplaySetting.BLOCK));
      } else {
        dispatch(setBarProgressFormDisplay(DisplaySetting.NONE));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalCarbs();
  }, [meals, barProgressFormDisplay]);

  return (
    <div className="progress-bar">
      <div id="myProgress" onClick={handleOpenProgressForm}>
        <div className="progress-bar__info">
          <span className="progress-bar__icon">🍎</span>
          <span className="progress-bar__amount">
            {totalCarbs}/{user?.carbs_goal}
          </span>
          <span className="progress-bar__precenteges">{barPrecentages}%</span>
        </div>
        <div style={{ width: `${barPrecentagesWhatEver}%` }} id="myBar"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
