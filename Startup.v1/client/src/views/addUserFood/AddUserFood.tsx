import React, { useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";

const AddUserFood = () => {
  const [portion, setPortion] = useState<string>("הגדר מנה");
  const [size, setSize] = useState<number>(100);
  const [calories, setCalories] = useState<number>();

function handleShowAddSelect() {
    try {
        const formPortionType = document.querySelector(".add-portion-type") as HTMLDivElement;
        formPortionType.style.display = "block";
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className="add-user-food">
      <Header headerType="addVals"></Header>
      <Navbar navbarType="main"></Navbar>
      <div dir="rtl">
        <form className="user-food">
          <input type="text" name="foodName" placeholder="הזן שם לפריט" />
          <select
            className="user-food__select"
            name="size"
          >
            <option value="gram">בסיס</option>
          </select>
          <span onClick={handleShowAddSelect} className="material-symbols-outlined">add</span>
          <input
            type="number"
            name="size"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
            }}
          />
          <input type="number" name="carbs" placeholder="פחמימות" />
          <input type="number" name="protein" placeholder="חלבונים" />
          <input type="number" name="fat" placeholder="שומנים" />
          <div>{calories}</div>
          <button type="submit">הוסף אוכל</button>
        </form>
      </div>

      <div className="add-portion-type">
        <input type="text" placeholder="הגדר שם מנה חדשה"/>
        <input type="number" placeholder="הגדר משקל מנה חדשה בגרמים"/>
        <button>שמור מנה</button>
      </div>
    </div>
  );
};

export default AddUserFood;
