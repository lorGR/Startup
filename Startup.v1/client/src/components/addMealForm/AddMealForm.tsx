import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks';
import { DisplaySetting } from '../header/Header';
import { carbsCounterSelector } from './../../features/carbs/carbsSlice';

interface AddMealFormProps {
  displayType: string;
  setDisplay: CallableFunction;
}

export const AddMealForm: FC<AddMealFormProps> = ({ displayType, setDisplay }) => {

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>();

  useEffect(() => {
    const dateTime = new Date();

    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const fullDate = `${year}-${month}-${day}`;
    setCurrentDate(fullDate);

    let hours: any = dateTime.getHours();
    if(hours.toString().length < 2) {
      hours = `0${hours}`;
    }
    const minutes = dateTime.getMinutes();
    const fullTime = `${hours}:${minutes}`;
    setCurrentTime(fullTime);
  }, []);

  const totalCarbs = useAppSelector(carbsCounterSelector)
  const handleAddMeal = async (event: any) => {
    try {
      event.preventDefault();

      //TODO: get current time + date

      //TODO: display current time and date in values
      //TODO: create meal with the user id
      //TODO: create serving for the meal with the meal id that was created

      const { bloodSugarInput, dateInput, insulinInput, timeInput, carbsInput } = event.target.elements;
      const [blood_sugar, insulin, date, time, carbs] = [bloodSugarInput.value, insulinInput.value, dateInput.value, timeInput.value, carbsInput.value];

      // console.log(date);

      // const { data } = await axios.post("/api/meals/add-meal", { blood_sugar, insulin, date, time, carbs });
      // if (!data) throw new Error("Couldn't receive data from axios POST '/add-meal' ");
      // const { result } = data;
      // if (result.affectedRows > 0) {
      //   setDisplay(DisplaySetting.NONE)
      // }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ display: `${displayType}` }}>
      <div className="add-meal-container">
        <div className="add-meal">
          <form onSubmit={handleAddMeal} className="add-meal__form">
            <input onChange={(event) => setCurrentDate(event.target.value)} type="date" name="dateInput" id="date" placeholder="הזן תאריך" value={currentDate}/>
            <input onChange={(event) => setCurrentTime(event.target.value)} type="time" name="timeInput" id="time" placeholder="הזן שעת ארוחה" value={currentTime}/>
            <input type="number" name="bloodSugarInput" id="bloodSugar" placeholder="הזן כמות סוכר בדם" />
            <input type="number" name="carbsInput" id="carbsInput" disabled placeholder="הזן כמות פחמימות" value={totalCarbs} />
            <input type="number" name="insulinInput" id="insulin" placeholder="הזן כמות אינסולין" />
            <button>✅</button>
          </form>
        </div>
      </div>
    </div>
  )
}