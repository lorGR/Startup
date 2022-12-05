import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const UserInfo = () => {
    const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [age, setAge] = useState<number>();

  const { register, handleSubmit } = useForm();


  const onSubmit = async (info: any) => {
    const formData = JSON.stringify(info);
    const { data } = await axios.post("/api/users/updated-user-info", {
      formData, 
    });
    const {result} = data;
    if (result.affectedRows > 0) {
        navigate("/home")
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("birth_date")}
          onChange={handleUpdate}
          name="birth_date"
          type="date"
        />
        <input
          {...register("height")}
          type="text"
          name="height"
          placeholder="גובה"
        />
        <input
          {...register("weight")}
          type="text"
          name="weight"
          placeholder="משקל"
        />
        <select {...register("gender")} name="gender">
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
        <select {...register("diabetes_type")} name="diabetes_type">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <input
          {...register("hmo")}
          type="text"
          name="hmo"
          placeholder="קופת חולים"
        />
        <label htmlFor="mgdl" className="switch-label switch-label-off">
          <input
            {...register("sugar")}
            type="radio"
            className="switch-input"
            name="sugar"
            value="mgdl"
            id="mgdl"
          />
          mg/dl
        </label>
        <div className="blood_sugar">
          <label htmlFor="american" className="switch-label switch-label-on">
            <input
              {...register("sugar")}
              type="radio"
              className="switch-input"
              name="sugar"
              value="american"
              id="american"
            />
            american units
          </label>

          <label
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
            />
            גרם
          </label>
        </div>

        <div className="measure">
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
            />
            לא כולל
          </label>
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
