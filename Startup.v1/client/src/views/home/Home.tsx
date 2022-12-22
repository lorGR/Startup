import axios from "axios";
import { useEffect, useState } from "react"
import { formatDiagnosticsWithColorAndContext } from "typescript";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import { carbsCounterSelector } from "../../features/carbs/carbsSlice";
import { userSelector } from "../../features/user/userSlice";
import MealItem from "../../components/mealItem/MealItem";
import ProgressBar from "../../components/progressBar/ProgressBar";
import SetBarProgressForm from "../../components/setBarProgressForm/SetBarProgressForm";
import { getUserByCookie } from "../../features/user/userAPI";
import moment from "moment";

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

  const dispatch = useAppDispatch();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [date , setDate] = useState<any>(moment().format().slice(0,10));
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
    dispatch(getUserByCookie());
    getTodayMeals();
  }, []);

  return (
    <div className="home">
      <Header headerType="addVals" addMealForm={addMealForm} setAddMealForm={setAddMealForm} setShowMenu={setShowMenu} showMenu={showMenu}/>
      <Navbar navbarType="main"  />
      <div className="home__container">
        {meals.map(meal => <MealItem meal={meal} key={meal.meal_id} setMeals={setMeals} date={date}/>)}
        
      </div>
      <ProgressBar meals={meals}/>
      <SetBarProgressForm />
      {showMenu &&
        <div className="menu-screen">
          
        </div>
      }
    </div>
  )
}

export default Home