import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  emptyArray,
  foodarraySelector,
} from "../../features/food/foodArraySlice";
import { DisplaySetting } from "../header/Header";
import { carbsCounterSelector } from "./../../features/carbs/carbsSlice";
import { resetCarbs } from "./../../features/carbs/carbsSlice";
import { addMeal } from "./../../features/openMeal/openMealAPI";
import { Meal } from "./../../features/openMeal/mealModel";
import { openMealSelector } from "../../features/openMeal/openMealSlice";

interface AddMealFormProps {
  displayType: string;
  setDisplay: CallableFunction;
}

export const AddMealForm: FC<AddMealFormProps> = ({
  displayType,
  setDisplay,
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>();

  const foodArray = useAppSelector(foodarraySelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const openMeal = useAppSelector(openMealSelector);

  useEffect(() => {
    const dateTime = new Date();
    console.log(dateTime)

    let day: string | number = dateTime.getDate();

    console.log(day)

    if (day.toString().length < 2) {
      day = `0${day}`
    }

    let month: string | number = dateTime.getMonth() + 1;

    if (month.toString().length < 2) {
      month = `0${month}`;
    }

    let year = dateTime.getFullYear();

    console.log(day)
    console.log(month)
    console.log(year)

    const fullDate = `${year}-${month}-${day}`;
    setCurrentDate(fullDate);

    let hours: string | number = dateTime.getHours();
    if (hours.toString().length < 2) {
      hours = `0${hours}`;
    }
    let minutes: string | number = dateTime.getMinutes();
    if (minutes.toString().length < 2) {
      minutes = `0${minutes}`;
    }
    const fullTime = `${hours}:${minutes}`;
    setCurrentTime(fullTime);
  }, [displayType]);

  const totalCarbs = useAppSelector(carbsCounterSelector);

  const handleAddMeal = async (event: any) => {
    try {
      event.preventDefault();

      const {
        bloodSugarInput,
        dateInput,
        insulinInput,
        timeInput,
        carbsInput,
      } = event.target.elements;
      const [blood_sugar, insulin, date, time, carbs] = [
        bloodSugarInput.value,
        insulinInput.value,
        dateInput.value,
        timeInput.value,
        carbsInput.value,
      ];

      const mealInformation = { blood_sugar, insulin, date, time, carbs };
      dispatch(addMeal({ mealInformation }));
      setDisplay(DisplaySetting.NONE);
      event.target.elements.bloodSugarInput.value = "";
      event.target.elements.insulinInput.value = "";
      event.target.elements.carbsInput.value = "";

      navigate("/list")

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: `${displayType}` }}>
      <div className="add-meal-container">
        <div className="add-meal">
          <form onSubmit={handleAddMeal} className="add-meal__form">
            <input
              onChange={(event) => setCurrentDate(event.target.value)}
              type="date"
              name="dateInput"
              id="date"
              placeholder="הזן תאריך"
              value={currentDate}
            />
            <input
              onChange={(event) => setCurrentTime(event.target.value)}
              type="time"
              name="timeInput"
              id="time"
              placeholder="הזן שעת ארוחה"
              value={currentTime}
            />
            <input
              type="number"
              name="bloodSugarInput"
              id="bloodSugar"
              placeholder="הזן כמות סוכר בדם"
            />
            <input
              type="number"
              name="carbsInput"
              id="carbsInput"
              placeholder="הזן כמות פחמימות"
            />
            <input
              type="number"
              name="insulinInput"
              id="insulin"
              placeholder="הזן כמות אינסולין"
            />
            <div className="add-meal__form__buttons">
              <button
                type="button"
                onClick={() => {
                  setDisplay(DisplaySetting.NONE);
                }}
              >
                X
              </button>
              <button type="submit">✅</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
