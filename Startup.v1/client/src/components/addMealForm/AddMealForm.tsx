import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { foodarraySelector } from '../../features/food/foodArraySlice';
import { DisplaySetting } from '../header/Header';
import { carbsCounterSelector } from './../../features/carbs/carbsSlice';

interface AddMealFormProps {
  displayType: string;
  setDisplay: CallableFunction;
}

export const AddMealForm: FC<AddMealFormProps> = ({ displayType, setDisplay }) => {

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>();

  const foodArray = useAppSelector(foodarraySelector);

  const navigate = useNavigate();

  useEffect(() => {
    const dateTime = new Date();
    const fullDate = `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}`;
    setCurrentDate(fullDate);

    let hours: any = dateTime.getHours();
    if (hours.toString().length < 2) {
      hours = `0${hours}`;
    }
    const fullTime = `${hours}:${dateTime.getMinutes()}`;
    setCurrentTime(fullTime);
  }, []);

  const totalCarbs = useAppSelector(carbsCounterSelector)
  const handleAddMeal = async (event: any) => {
    try {
      event.preventDefault();

      const { bloodSugarInput, dateInput, insulinInput, timeInput, carbsInput } = event.target.elements;
      const [blood_sugar, insulin, date, time, carbs] = [bloodSugarInput.value, insulinInput.value, dateInput.value, timeInput.value, carbsInput.value];

      const { data } = await axios.post("/api/meals/add-meal", { blood_sugar, insulin, date, time, carbs });
      if (!data) throw new Error("Couldn't receive data from axios POST '/add-meal' ");
      const { result } = data;
      if(result.affectedRows = 1) {
        const mealId = result.insertId;
        const { data } = await axios.post("/api/servings/add-servings-to-meal", {mealId, foodArray});
        if(!data) throw new Error("Couldn't receive data from axios POST '/api/servings/add-serving-to-meal' ");
        const { status } = data;
        if(status === true) {
          setDisplay(DisplaySetting.NONE);
          navigate("/home");
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ display: `${displayType}` }}>
      <div className="add-meal-container">
        <div className="add-meal">
          <form onSubmit={handleAddMeal} className="add-meal__form">
            <input onChange={(event) => setCurrentDate(event.target.value)} type="date" name="dateInput" id="date" placeholder="הזן תאריך" value={currentDate} />
            <input onChange={(event) => setCurrentTime(event.target.value)} type="time" name="timeInput" id="time" placeholder="הזן שעת ארוחה" value={currentTime} />
            <input type="number" name="bloodSugarInput" id="bloodSugar" placeholder="הזן כמות סוכר בדם" />
            <input type="number" name="carbsInput" id="carbsInput" disabled placeholder="הזן כמות פחמימות" value={totalCarbs} />
            <input type="number" name="insulinInput" id="insulin" placeholder="הזן כמות אינסולין" />
            <div className="add-meal__form__buttons">
              <button onClick={() => { setDisplay(DisplaySetting.NONE) }}>X</button>
              <button >✅</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}