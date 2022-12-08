import axios from 'axios';
import React, { FC } from 'react'
import { useAppSelector } from '../../app/hooks';
import { DisplaySetting } from '../header/Header';
import { carbsCounterSelector } from './../../features/carbs/carbsSlice';

interface AddMealFormProps {
    displayType: string;
    setDisplay: CallableFunction;
}

export const AddMealForm:FC<AddMealFormProps> = ({displayType, setDisplay}) => {

    const totalCarbs = useAppSelector(carbsCounterSelector)
    const handleAddMeal = async (event: any) => {
        try {
          event.preventDefault();
          const { bloodSugarInput, dateInput, insulinInput, timeInput, carbsInput } = event.target.elements;
          const [blood_sugar, insulin, date, time, carbs] = [bloodSugarInput.value, insulinInput.value, dateInput.value, timeInput.value, carbsInput.value];
    
          const { data } = await axios.post("/api/meals/add-meal", { blood_sugar, insulin, date, time, carbs });
          if (!data) throw new Error("Couldn't receive data from axios POST '/add-meal' ");
          const { result } = data;
          if(result.affectedRows > 0) {
            setDisplay(DisplaySetting.NONE)
          }
          
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div style={{display: `${displayType}`}}>
        <div className="add-meal-container">
          <div className="add-meal">
            <form onSubmit={handleAddMeal} className="add-meal__form">
              <input type="date" name="dateInput" id="date" placeholder="הזן תאריך" />
              <input type="time" name="timeInput" id="time" placeholder="הזן שעת ארוחה" />
              <input type="number" name="bloodSugarInput" id="bloodSugar" placeholder="הזן כמות סוכר בדם" />
              <input type="number" name="carbsInput" id="carbsInput" disabled placeholder="הזן כמות פחמימות" value={totalCarbs}/>
              <input type="number" name="insulinInput" id="insulin" placeholder="הזן כמות אינסולין" />
              <button>✅</button>
            </form>
          </div>
        </div>
    </div>
  )
}