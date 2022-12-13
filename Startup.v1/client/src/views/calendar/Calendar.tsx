import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { getCurrentDate } from "../../helpers/helpers";

const Calendar = () => {

    const [date , setDate] = useState<string | undefined>(getCurrentDate());

    const getMealsByDate =  async () => {
        try {
            const { data } = await axios.post("/api/meals/get-meals-by-date", {date});
            if(!data) throw new Error("Couldn't receive date from axios POST 'get-meals-by-date' ");
            console.log(data);
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
            //TODO: make logic to change date to day backwards
        } catch (error) {
            console.error(error);   
        }
    }

    const handleDayFoward = () => {
        try {
            console.log("Day Foward");
            //TODO: make logic to change date to day forwards
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
        </div>
    )
}

export default Calendar;