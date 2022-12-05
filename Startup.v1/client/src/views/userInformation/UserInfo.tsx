import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const UserInfo = () => {
  const [date, setDate] = useState<Date>();
  const [age, setAge] = useState<number>();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    const formData = JSON.stringify(data);
    console.log(formData)
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
        {...register("birthday")}
          onChange={handleUpdate}
          name="birthday"
          onBlur={handleChangetotext}
          onClick={handleChangetoDate}
          type="text"
          placeholder="גיל"
        />
        <input
          {...register("height")}
          type="number"
          name="height"
          placeholder="גובה"
        />
        <input
          {...register("weight")}
          type="number"
          name="weight"
          placeholder="משקל"
        />
        <select {...register("gender")} name="gender">
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
        <select {...register("diabetesType")} name="diabetesType">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <input
          {...register("hmo")}
          type="text"
          name="hmo"
          placeholder="קופת חולים"
        />
        <div {...register("sugar")} className="switch">
          <input
            type="radio"
            className="switch-input"
            name="sugar"
            value="mgdl"
            id="mgdl"
          />
          <label htmlFor="mgdl" className="switch-label switch-label-off">
            mg/dl
          </label>
          <input
            type="radio"
            className="switch-input"
            name="sugar"
            value="american"
            id="american"
          />
          <label htmlFor="american" className="switch-label switch-label-on">
            american units
          </label>
          <span className="switch-selection"></span>
        </div>
        <div {...register("units")} className="switch-count">
          <input
            type="radio"
            className="switch-count-input"
            name="units"
            value="gram"
            id="gram"
          />
          <label
            htmlFor="gram"
            className="switch-count-label switch-count-label-off"
          >
        גרם
          </label>
          <input
            type="radio"
            className="switch-count-input"
            name="units"
            value="portion"
            id="portion"
          />
          <label
            htmlFor="unit"
            className="switch-count-label switch-count-label-on"
          >
            מנות
          </label>
          <span className="switch-count-selection"></span>
        </div>
        <div {...register("protein")} className="switch-protein">
          <input
            type="radio"
            className="switch-protein-input"
            name="protein"
            value="include"
            id="include"
          />
          <label
            htmlFor="include"
            className="switch-protein-label switch-protein-label-off"
          >
            כולל
          </label>
          <input
            type="radio"
            className="switch-protein-input"
            name="protein"
            value="notInclude"
            id="notInclude"
          />
          <label
            htmlFor="notInclude"
            className="switch-protein-label switch-protein-label-on"
          >
            לא כולל
          </label>
          <span className="switch-protein-selection"></span>
        </div>
        <div className="balance">
          <input
            {...register("balance_min")}
            type="number"
            name="balance_min"
          />
          <input
            {...register("balance_max")}
            type="number"
            name="balance_max"
          />
        </div>
        <button type="submit">check</button>
      </form>
    </div>
  );
};
