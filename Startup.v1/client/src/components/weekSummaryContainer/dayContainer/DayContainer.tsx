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

    useEffect(() => {
        if (summaryTypeDisplay === SummaryTypeDisplay.BLOOD_SUGAR) {
            // console.log(`Calc blood sugar at: ${day}`);

        } else if (summaryTypeDisplay === SummaryTypeDisplay.CARBS) {
            // console.log(`Calc Carbs at: ${day}`);
            getDailyCarbs();
        } else {
            // console.log(`Calc Insuline at: ${day}`);
            getDailyInsulin();
        }

    }, []);

    return (
        <div className="day-container">
            <p>
                {displayDay}
            </p>
            <p>
                {daySum}
            </p>
        </div>
    );
}

export default DayContainer;