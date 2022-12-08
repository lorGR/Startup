import axios from "axios";
import { useState } from "react"
import { formatDiagnosticsWithColorAndContext } from "typescript";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { userSelector } from "../../features/user/userSlice";

const Home = () => {

  const [addMealForm, setAddMealForm] = useState(false);

  const user = useAppSelector(userSelector);

  const handleAddMeal = async (event: any) => {
    try {
      event.preventDefault();
      const { bloodSugarInput, dateInput, insulinInput, timeInput } = event.target.elements;
      const [blood_sugar, insulin, date, time] = [bloodSugarInput.value, insulinInput.value, dateInput.value, timeInput.value];

      const { data } = await axios.post("/api/meals/add-meal", { blood_sugar, insulin, date, time });
      if (!data) throw new Error("Couldn't receive data from axios POST '/add-meal' ");
      const { result } = data;
      if(result.affectedRows > 0) {
        setAddMealForm(!addMealForm);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="home">
      <Header headerType="addVals" addMealForm={addMealForm} setAddMealForm={setAddMealForm} />
      <Navbar navbarType="main" />
      {addMealForm &&
        <div className="add-meal-container">
          <div className="add-meal">
            <form onSubmit={handleAddMeal} className="add-meal__form">
              <input type="date" name="dateInput" id="date" placeholder="הזן תאריך" />
              <input type="time" name="timeInput" id="time" placeholder="הזן שעת ארוחה" />
              <input type="number" name="bloodSugarInput" id="bloodSugar" placeholder="הזן כמות סוכר בדם" />
              <input type="number" name="insulinInput" id="insulin" placeholder="הזן כמות אינסולין" />
              <button>✅</button>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default Home