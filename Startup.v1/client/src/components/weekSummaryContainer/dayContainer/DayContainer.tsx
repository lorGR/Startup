import axios from "axios";
import { useEffect, useState } from "react";
import { SummaryTypeDisplay } from "../WeekSummaryContainer";

interface DayContainerProps {
    displayDay: string,
    day: string,
    summaryTypeDisplay: SummaryTypeDisplay
}

const DayContainer: React.FC<DayContainerProps> = ({ displayDay, day, summaryTypeDisplay }) => {

    const getDailyCarbs = async () => {
        try {
            const { data } = await axios.post("/api/graph/get-daily-carbs", { day });
            if(!data) throw new Error("Couldn't receive data from axios POST 'get-daily-carbs' ");
            console.log(data);
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
        }

    }, []);

    return (
        <div className="day-container">
            {displayDay}
        </div>
    );
}

export default DayContainer;