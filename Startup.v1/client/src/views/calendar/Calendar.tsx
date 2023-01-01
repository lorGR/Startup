import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { getCurrentDate } from "../../helpers/helpers";
import moment from "moment";
import { Meal } from "../../features/openMeal/mealModel";
import MealItem from "../../components/mealItem/MealItem";
import { Link } from "react-router-dom";
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import Menu from "../../components/menu/Menu";
import arrowLeft from "../../assets/images/calendar/arrowLeft.png";
import arrowRight from "../../assets/images/calendar/arrowRight.png";

const Calendar = () => {

    console.log('rendering calendar');

    const [date, setDate] = useState<any>(moment().format().slice(0, 10));
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [meals, setMeals] = useState<Meal[]>([]);

    const getMealsByDate = async () => {
        try {
            const { data } = await axios.post("/api/meals/get-meals-by-date", { date });
            if (!data) throw new Error("Couldn't receive date from axios POST 'get-meals-by-date' ");
            const { result } = data;
            setMeals(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMealsByDate();
    }, [date]);

    const handleDayBack = () => {
        try {
            console.log("Day Back");
            setDate(moment(date).subtract(1, 'days').format().slice(0, 10));
        } catch (error) {
            console.error(error);
        }
    }

    const handleDayFoward = () => {
        try {
            setDate(moment(date).add(1, 'days').format().slice(0, 10));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="calendar">
            <Header headerType="calendar" showMenu={showMenu} setShowMenu={setShowMenu} />
            <Navbar navbarType="calendar" />
            <div className="calendar__container">
                <div className="day-selector">
                    <button onClick={handleDayFoward}>
                        <img src={arrowLeft} alt="week foward" />
                    </button>
                    <p>{date}</p>
                    <button onClick={handleDayBack}>
                        <img src={arrowRight} alt="week backward" />
                    </button>
                </div>
                {meals.map(meal => <MealItem meal={meal} key={meal.meal_id} setMeals={setMeals} date={date} type={"calendar"} />)}
            </div>
            {showMenu && <Menu />}
        </div>
    )
}

export default Calendar;