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
import {Meal} from "../../features/openMeal/mealModel"
import { openMealSelector } from "../../features/openMeal/openMealSlice";
import { getLastMeal } from "../../features/openMeal/openMealAPI";

const Home = () => {

  const [addMealForm, setAddMealForm] = useState(false);

  const user = useAppSelector(userSelector);
  const carbs = useAppSelector(carbsCounterSelector);
  const openMeal = useAppSelector(openMealSelector);

  const dispatch = useAppDispatch();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [date , setDate] = useState<any>(moment().format().slice(0,10));
  const [openMealIsOpened, setOpenMealIsOpend] = useState<boolean>(false)

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

  useEffect(() => {
    dispatch(getLastMeal());
    console.log(openMeal)
    if (openMeal !== null && openMeal !== undefined) {
      setOpenMealIsOpend(true)
    } else if (openMeal === undefined) {
      setOpenMealIsOpend(false)
    } else {
      setOpenMealIsOpend(false)
    }
  },[user])

  return (
    <div className="home">
      <Header headerType="addVals" addMealForm={addMealForm} setAddMealForm={setAddMealForm} />
      <Navbar navbarType="main" />
      <div className="home__container">
        {/* {meals.map(meal => <MealItem meal={meal} key={meal.meal_id} setMeals={setMeals} date={date}/>)} */}
        {!openMealIsOpened && <div dir="rtl">שלום {user?.first_name} אנא הזן מדדים</div>}
        {openMealIsOpened && <MealItem meal={openMeal!} setMeals={setMeals} date={date}/>}
      </div>
      <ProgressBar meals={meals}/>
      <SetBarProgressForm />
    </div>
  )
}

export default Home