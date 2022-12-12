import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { barProgressFormSelector, setBarProgressFormDisplay } from "../../features/barProgressForm/barProgressFormSlice";
import { setCarbsGoal } from "../../features/carbsGoal/carbsGoalSlice";
import { DisplaySetting } from "../header/Header";


const SetBarProgressForm = () => {

  const barProgressFormDisplay = useAppSelector(barProgressFormSelector);

  const dispatch = useAppDispatch();

  const handleChangeBarProgressGoal = (event: any) => {
    try {
      event.preventDefault();
      dispatch(setCarbsGoal(event.target.elements.carbsGoal.value));
      dispatch(setBarProgressFormDisplay(DisplaySetting.NONE));
    } catch (error) {
      console.log(event);
    }
  }

  return (
    <div className="set-bar-progress-form" style={{ display: `${barProgressFormDisplay}` }}>
      <form onSubmit={handleChangeBarProgressGoal}>
        <button type="button" onClick={() => { dispatch(setBarProgressFormDisplay(DisplaySetting.NONE)) }}>X</button>
        <button>✅</button>
        <input type="number" name="carbsGoal" placeholder="הגדר את היעד היומי" min={1}/>
      </form>
    </div>
  )
}

export default SetBarProgressForm;