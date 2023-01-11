import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";
import Menu from "./../../components/menu/Menu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import moment from "moment";
import { updateBirthDate, userSelector } from "./../../features/user/userSlice";
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
import {
  CarbsUnit,
  DiabetesTypes,
  Gender,
} from "../../features/user/userModel";

export const UserInfo = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [age, setAge] = useState<number>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const [gender, setGender] = useState<Gender>();
  const [height, setHeight] = useState<number>();
  const [diabetesType, setDiabetesType] = useState<DiabetesTypes>();
  const [weight, setWeight] = useState<number>();
  const [hmo, setHmo] = useState<string>();
  const [carbsMeasure, setCarbsMeasure] = useState<CarbsUnit>();
  const [proteinCalc, setProteinCalc] = useState<number | boolean>();
  const [balanceMin, setBalanceMin] = useState<number>();
  const [balanceMax, setBalanceMax] = useState<number>();
  const [birthDate, setBirthDate] = useState<string | Date>();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) {
      if (user.gender) setGender(user.gender);
      if (user.height) setHeight(user.height);
      if (user.diabetes_type) setDiabetesType(user.diabetes_type);
      if (user.weight) setWeight(user.weight);
      if (user.hmo) setHmo(user.hmo);
      if (user.carbs_unit) setCarbsMeasure(user.carbs_unit);
      if (user.protein_calc) setProteinCalc(user.protein_calc);
      if (user.balance_min) setBalanceMin(user.balance_min);
      if (user.balance_max) setBalanceMax(user.balance_max);
      // if(user.birth_date) setBirthDate(user.birth_date)
      
      // console.log(user.birth_date)
      const bdFormatted = user.birth_date!.toString().slice(0, 10);
      // console.log(typeof(bdFormatted))
      // const bd = new Date(bdFormatted)
      // // console.log(bd.setDate(bd.getDate() +1))
      // const finalBd = new Date(bd.setDate(bd.getDate() +1))
      // const finalFinalBd = finalBd.toISOString().toString().slice(0, 10);
      // console.log(finalFinalBd)
      // console.log(finalBd)
      setBirthDate(bdFormatted)
    }
  }, [user]);

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
              onChange={(ev) => {
                setBirthDate(ev.target.value)
                dispatch(updateBirthDate(ev.target.value))
              }}
              name="birth_date"
              type="date"
              className="input_small"
              value={`${birthDate}`}
            />
            <input
              {...register("height")}
              type="text"
              name="height"
              placeholder="גובה"
              className="input_small"
              onChange={(ev) => {
                setHeight(Number(ev.target.value));
                dispatch(updateHeight(ev.target.value));
              }}
              value={height}
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
              value={weight}
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
              value={gender}
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
                dispatch(updateDiabetesType(Number(ev.target.value)));
                console.log(Number(ev.target.value))
              }}
              value={diabetesType}
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
              value={hmo}
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
                <input
                  checked
                  type="radio"
                  name="blood-sugar"
                  id="blood-sugar-1"
                />
                <label htmlFor="blood-sugar-1">mg/dl</label>
                <input type="radio" name="blood-sugar" id="blood-sugar-2" />
                <label htmlFor="blood-sugar-2">mmol/lit</label>
              </div>
            </div>
          </div>

          <div className="measure">
            <div className="text">
              <p>ספירת פחמימות</p>
            </div>
            <div className="fields">
              <div className="switch-field">
                {carbsMeasure === "gram" && (
                  <>
                    <input
                      onChange={() => {
                        dispatch(updateCarbsUnit("portion"));
                      }}
                      type="radio"
                      name="messure"
                      id="messure-1"
                    />
                    <label htmlFor="messure-1">מנה</label>
                    <input
                      onChange={() => {
                        dispatch(updateCarbsUnit("gram"));
                      }}
                      checked
                      type="radio"
                      name="messure"
                      id="messure-2"
                    />
                    <label htmlFor="messure-2">גרם</label>
                  </>
                )}
                {carbsMeasure === "portion" && (
                  <>
                    <input
                      onChange={() => {
                        dispatch(updateCarbsUnit("portion"));
                      }}
                      checked
                      type="radio"
                      name="messure"
                      id="messure-1"
                    />
                    <label htmlFor="messure-1">מנה</label>
                    <input
                      onChange={() => {
                        dispatch(updateCarbsUnit("gram"));
                      }}
                      type="radio"
                      name="messure"
                      id="messure-2"
                    />
                    <label htmlFor="messure-2">גרם</label>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="protien_included">
            <div className="text">
              <p>חישוב חלבונים</p>
            </div>
            <div className="fields">
              <div className="switch-field">
                <input
                  type="radio"
                  name="protien-included"
                  id="protien-included-1"
                  checked
                />
                <label htmlFor="protien-included-1">לא כולל</label>
                <input
                  type="radio"
                  name="protien-included"
                  id="protien-included-2"
                />
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
                <input
                  onChange={(ev) => {
                    setBalanceMin(Number(ev.target.value));
                    updateBalanceMin(Number(ev.target.value))
                  }}
                  type="number"
                  name="balance_min"
                  id=""
                  placeholder="מינימום"
                />
                <input
                  onChange={(ev) => {
                    setBalanceMax(Number(ev.target.value));
                    updateBalanceMax(Number(ev.target.value))
                  }}
                  type="number"
                  name="balance_max"
                  id=""
                  placeholder="מקסימום"
                />
              </div>
            </div>
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
