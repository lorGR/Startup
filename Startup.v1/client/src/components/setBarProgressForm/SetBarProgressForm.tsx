import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { barProgressFormSelector, setBarProgressFormDisplay } from "../../features/barProgressForm/barProgressFormSlice";
import { DisplaySetting } from "../header/Header";


const SetBarProgressForm = () => {

  const barProgressFormDisplay = useAppSelector(barProgressFormSelector);

  const dispatch = useAppDispatch();

  const handleChangeBarProgressGoal = () => {
    try {
      
    } catch (error) {

    }
  }

  return (
    <div className="set-bar-progress-form" style={{ display: `${barProgressFormDisplay}` }}>
      <form onSubmit={handleChangeBarProgressGoal}>
        <button type="button" onClick={() => { dispatch(setBarProgressFormDisplay(DisplaySetting.NONE)) }}>X</button>
        <button>✅</button>
        <input type="number" name="carbsGoal" placeholder="הגדר את היעד היומי" />
      </form>
    </div>
  )
}

export default SetBarProgressForm;