import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { getCurrentDate } from "../../helpers/helpers";
import moment from "moment";
import { Meal } from "../home/Home";
import MealItem from "../../components/mealItem/MealItem";

const Calendar = () => {

    const [date , setDate] = useState<any>(moment().format().slice(0,10));

    const [meals, setMeals] = useState<Meal[]>([]);

    const getMealsByDate =  async () => {
        try {
            const { data } = await axios.post("/api/meals/get-meals-by-date", {date});
            if(!data) throw new Error("Couldn't receive date from axios POST 'get-meals-by-date' ");
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
            setDate(moment(date).subtract(1, 'days').format().slice(0,10));
        } catch (error) {
            console.error(error);   
        }
    }

    const handleDayFoward = () => {
        try {
            setDate(moment(date).add(1, 'days').format().slice(0,10));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="calendar">
            <Header headerType="calendar" />
            <Navbar navbarType="calendar" />
            <div style={{textAlign: "center"}}>
                <button onClick={handleDayFoward}>&lt;</button>
                <span>{date}</span>
                <button onClick={handleDayBack}>&gt;</button>
            </div>
            <div className="calendar__container">
                {meals.map(meal => <MealItem meal={meal} key={meal.meal_id} setMeals={setMeals}/>)}
            </div>
        </div>
    )
}

export default Calendar;