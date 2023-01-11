import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";
import Menu from "./../../components/menu/Menu";
import { useAppDispatch } from "../../app/hooks";
import {
  updateDiabetesType,
  updateGender,
  updateHeight,
  updateHmo,
  updateWeight,
  updateCarbsUnit,
  updateProteinCalc,
  updateBalanceMin,
  updateBalanceMax,
} from "../../features/user/userSlice";

export const UserInfo = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [age, setAge] = useState<number>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (info: any) => {
    const formData = JSON.stringify(info);
    const { data } = await axios.post("/api/users/updated-user-info", {
      formData,
    });
    const { result } = data;
    if (result.affectedRows > 0) {
      navigate("/home");
    }
  };

  function getAge(dateString: Date) {
    var today = new Date();
    var birthDate = new Date(date!);
    var ageCalc = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageCalc--;
    }
    console.log(ageCalc);
    setAge(ageCalc);
  }

  function handleChangetoDate(event: any) {
    try {
      if (event.target.type === "text") {
        event.target.type = "date";
      }
    } catch (error) {
      console.error(error);
    }
  }

  function changeAge(date: Date) {
    try {
    } catch (error) {
      console.error(error);
    }
  }
  function handleChangetotext(event: any) {
    try {
      setDate(event.target.value);
      getAge(date!);
      if (event.target.type === "date") {
        event.target.type = "text";
        event.target.value = age;
      }
      console.log(date);
    } catch (error) {
      console.error(error);
    }
  }
  function handleUpdate(event: any) {
    try {
      setDate(event.target.value);
      console.log(date);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateUser(event: any) {
    try {
      event.preventDefault();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="settings">
      <Header
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        headerType="settings"
      />
      <Navbar navbarType="settings" />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="container__up">
          <div className="container__up__right">
            <input
              {...register("birth_date")}
              onChange={handleUpdate}
              name="birth_date"
              type="date"
              className="input_small"
            />
            <input
              {...register("height")}
              type="text"
              name="height"
              placeholder="גובה"
              className="input_small"
              onChange={(ev) => {
                dispatch(updateHeight(ev.target.value));
              }}
            />
            <input
              {...register("weight")}
              type="text"
              name="weight"
              placeholder="משקל"
              className="input_small"
              onChange={(ev) => {
                dispatch(updateWeight(ev.target.value));
              }}
            />
          </div>
          <div className="container__up__left">
            <select
              className="input_small"
              {...register("gender")}
              name="gender"
              onChange={(ev) => {
                dispatch(updateGender(ev.target.value));
              }}
            >
              <option value="male">זכר</option>
              <option value="female">נקבה</option>
              <option value="other">אחר</option>
            </select>
            <select
              className="input_small"
              {...register("diabetes_type")}
              name="diabetes_type"
              onChange={(ev) => {
                dispatch(updateDiabetesType(ev.target.value));
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <input
              {...register("hmo")}
              type="text"
              name="hmo"
              placeholder="קופת חולים"
              className="input_small"
              onChange={(ev) => {
                dispatch(updateHmo(ev.target.value));
              }}
            />
          </div>
        </div>
        <div className="container__down">
          <div className="blood_sugar">
            <div className="text">
              <p>חישוב סוכר בדם</p>
            </div>
            <div className="fields">
              <div className="switch-field">
                <input type="radio" name="blood-sugar" id="blood-sugar-1" />
                <label htmlFor="blood-sugar-1">mg/dl</label>
                <input type="radio" name="blood-sugar" id="blood-sugar-2" />
                <label htmlFor="blood-sugar-2">mmol/lit</label>
              </div>
            </div>
            {/* <div className="checked">
              <label htmlFor="mgdl" className="switch-label switch-label-off">
                mg/dl
              </label>
              <input
                {...register("sugar")}
                type="radio"
                className=""
                name="sugar"
                value="mgdl"
                id="mgdl"
              />
            </div>
            <div className="checked">
              <label
                htmlFor="american"
                className="switch-label switch-label-on"
              >
                american units
              </label>
              <input
                {...register("sugar")}
                type="radio"
                className=""
                name="sugar"
                value="american"
                id="american"
              />
            </div> */}
          </div>

          <div className="measure">
            <div className="text">
              <p>ספירת פחמימות</p>
            </div>
            <div className="fields">
              <div className="switch-field">
                <input type="radio" name="messure" id="messure-1" />
                <label htmlFor="messure-1">מנה</label>
                <input type="radio" name="messure" id="messure-2" />
                <label htmlFor="messure-2">גרם</label>
              </div>
            </div>
            {/* <label
              htmlFor="gram"
              className="switch-count-label switch-count-label-off"
            >
              <input
                {...register("units")}
                type="radio"
                className="switch-count-input"
                name="units"
                value="gram"
                id="gram"
                onChange={(ev) => {
                  dispatch(updateCarbsUnit(ev.target.value));
                }}
              />
              גרם
            </label>

            <label
              htmlFor="unit"
              className="switch-count-label switch-count-label-on"
            >
              <input
                {...register("units")}
                type="radio"
                className="switch-count-input"
                name="units"
                value="portion"
                id="portion"
                onChange={(ev) => {
                  dispatch(updateCarbsUnit(ev.target.value));
                }}
              />
              מנות
            </label>
          </div>

          <div className="protein_included">
            <label
              htmlFor="include"
              className="switch-protein-label switch-protein-label-off"
            >
              <input
                {...register("protein")}
                type="radio"
                className="switch-protein-input"
                name="protein"
                value="1"
                id="include"
                onChange={(ev) => {
                  dispatch(updateProteinCalc(ev.target.value));
                }}
              />
              כולל
            </label>

            <label
              htmlFor="notInclude"
              className="switch-protein-label switch-protein-label-on"
            >
              <input
                {...register("protein")}
                type="radio"
                className="switch-protein-input"
                name="protein"
                value="0"
                id="notInclude"
                onChange={(ev) => {
                  dispatch(updateProteinCalc(ev.target.value));
                }}
              />
              לא כולל
            </label> */}
          </div>
          <div className="protien_included">
            <div className="text">
              <p>חישוב חלבונים</p>
            </div>
            <div className="fields">
              <div className="switch-field">
                <input type="radio" name="protien-included" id="protien-included-1" />
                <label htmlFor="protien-included-1">לא כולל</label>
                <input type="radio" name="protien-included" id="protien-included-2" />
                <label htmlFor="protien-included-2">כולל</label>
              </div>
            </div>
          </div>
          <div className="balance">
            <div className="text">
              <p>טווח האיזון שלי</p>
            </div>
            <div className="fields">
              <div className="switch-field">
                <input type="number" name="" id="" placeholder="מינימום"/>
                <input type="number" name="" id="" placeholder="מקסימום" />
              </div>
            </div>
            {/* <input
              {...register("balance_min")}
              type="number"
              name="balance_min"
              onChange={(ev) => {
                dispatch(updateBalanceMin(ev.target.value));
              }}
            />
            <input
              {...register("balance_max")}
              type="number"
              name="balance_max"
              onChange={(ev) => {
                dispatch(updateBalanceMax(ev.target.value));
              }}
            /> */}
          </div>
          {/* <button className="button_input" type="submit">
            check
          </button> */}
        </div>
      </form>
      {showMenu && <Menu />}
    </div>
  );
};
