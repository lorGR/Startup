import axios from "axios";
import { useEffect, useState } from "react"
import { formatDiagnosticsWithColorAndContext } from "typescript";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { carbsCounterSelector } from "../../features/carbs/carbsSlice";
import { userSelector } from "../../features/user/userSlice";
import MealItem from "../../components/mealItem/MealItem";
import ProgressBar from "../../components/progressBar/ProgressBar";
import SetBarProgressForm from "../../components/setBarProgressForm/SetBarProgressForm";

export interface Meal {
  meal_id: number,
  blood_sugar: number,
  carbs: number,
  insulin: number,
  date: string,
  time: string,
  user_id: number,
  carbs_unit_type: string
}

const Home = () => {

  const [addMealForm, setAddMealForm] = useState(false);

  const user = useAppSelector(userSelector);
  const carbs = useAppSelector(carbsCounterSelector);

  const [meals, setMeals] = useState<Meal[]>([]);

  const getTodayMeals = async () => {
    try {
      const { data } = await axios.get("/api/meals/get-today-meals");
      if (!data) throw new Error("Couldn't receive data from axios GET '/api/meals/get-today-meals' ON FUNCTION getTodayMeals ON FILE Home.tsx ");
      const { result } = data;
      setMeals(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodayMeals();
  }, []);

  return (
    <div className="home">
      <Header headerType="addVals" addMealForm={addMealForm} setAddMealForm={setAddMealForm} />
      <Navbar navbarType="main" />
      <div className="home__container">
        {meals.map(meal => <MealItem meal={meal} key={meal.meal_id} setMeals={setMeals}/>)}
        
      </div>
      <ProgressBar meals={meals}/>
      <SetBarProgressForm />
    </div>
  )
}

export default Home