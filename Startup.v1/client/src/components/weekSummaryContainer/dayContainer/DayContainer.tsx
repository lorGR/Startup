import axios from "axios";
import { useEffect, useState } from "react";
import { SummaryTypeDisplay } from "../WeekSummaryContainer";

interface DayContainerProps {
    displayDay: string,
    day: string,
    summaryTypeDisplay: SummaryTypeDisplay
}

const DayContainer: React.FC<DayContainerProps> = ({ displayDay, day, summaryTypeDisplay }) => {

    const [daySum, setDaySum] = useState();

    const getDailyCarbs = async () => {
        try {
            const { data } = await axios.post("/api/graph/get-daily-carbs", { day });
            if (!data) throw new Error("Couldn't receive data from axios POST 'get-daily-carbs' ");
            const { result } = data;
            const { carbs } = result[0];
            setDaySum(carbs);
        } catch (error) {
            console.error(error);
        }
    }

    const getDailyInsulin = async () => {
        try {
            const { data } = await axios.post("/api/graph/get-daily-insulin", { day });
            if (!data) throw new Error("Couldn't receive data from axios POST 'get-daily-insulin' ");
            const { result } = data;
            const { insulin } = result[0];
            setDaySum(insulin);
        } catch (error) {
            console.error(error);
        }
    }

    const getDailyAverageBloodSugar = async () => {
        try {
            const { data } = await axios.post("/api/graph/get-daily-average-blood-sugar", { day });
            if(!data) throw new Error("Couldn't receive data from axios POST '/get-daily-average-blood-sugar' ");
            const { result } = data;
            const { bloodSugar } = result[0];         
            setDaySum(bloodSugar);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (summaryTypeDisplay === SummaryTypeDisplay.BLOOD_SUGAR) {
            getDailyAverageBloodSugar();
        } else if (summaryTypeDisplay === SummaryTypeDisplay.CARBS) {
            getDailyCarbs();
        } else {
            getDailyInsulin();
        }
    }, [day]);

    let barHeight = "";

    if(daySum !== undefined) {
        barHeight = daySum >= 100 ? `100%` : `${daySum}%`; 
    }

    return (
        <div className="day-container">
            <p>
                {displayDay}
            </p>
            <div className="bar-container">
                <div style={{height: barHeight}} className="bar"></div>
            </div>
            <p>
                {daySum}
            </p>
        </div>
    );
}

export default DayContainer;