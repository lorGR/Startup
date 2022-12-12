import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { barProgressFormSelector } from "../../features/barProgressForm/barProgressFormSlice";
import { DisplaySetting } from "../header/Header";


const SetBarProgressForm = () => {

  const barProgressFormDisplay = useAppSelector(barProgressFormSelector);
  let display = "none"

  if(barProgressFormDisplay === "none") {
    display = 'block';
  } else { 
    display = 'none';
  }

  return (
    <div className="set-bar-progress-form" style={{display : `${display}`}}>
      SetBarProgressForm
    </div>
  )
}

export default SetBarProgressForm;