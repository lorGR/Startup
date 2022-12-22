import axios from "axios";
import { useEffect, useState } from "react";
import DayContainer from "./dayContainer/DayContainer";

export enum SummaryTypeDisplay {
    BLOOD_SUGAR = "🩸 ממוצע סוכר יומי",
    CARBS = "🍎 סה״כ פחמימות יומי",
    INSULIN = "💉 סה״כ אינסולין יומי"
}


interface WeekSummaryContainerProps {
    summaryTypeDisplay: SummaryTypeDisplay,
    week: any
}

interface WeekSumary {
    sunday: any,
    monday: any
    tuesday: any,
    wednesday: any,
    thursday: any
    friday: any,
    saturday: any,
}

const WeekSummaryContainer: React.FC<WeekSummaryContainerProps> = ({ summaryTypeDisplay, week }) => {

    const [maxSummary, setMaxSummary] = useState<any>();
    const [weekSummary, setWeekSummary] = useState<WeekSumary>();

    const getMaximumCarbsInWeek = async (weekDays: Object) => {
        try {
            const { data } = await axios.post("/api/graph/get-maximum-carbs-week", { weekDays });
            if (!data) throw new Error("Couldn't receive data from axios POST 'get-maximum-carbs-week' ");
            const { maxCarbs, weekCarbs } = data;
            setMaxSummary(maxCarbs);
            setWeekSummary(weekCarbs);
        } catch (error) {
            console.error(error);
        }
    }

    const getMaximumInsulinInWeek = async (weekDays: Object) => {
        try {
            const { data } = await axios.post("/api/graph/get-maximum-insulin-week", { weekDays });
            if (!data) throw new Error("Couldn't receive data from axios POST '/get-maximum-insulin-week' ");
            const { maxInsulin, weekInsulin } = data;
            setMaxSummary(maxInsulin);
            setWeekSummary(weekInsulin);
        } catch (error) {
            console.error(error);
        }
    }

    const getMaximumAverageBloodSugarInWeek = async (weekDays: Object) => {
        try {
            const { data } = await axios.post("/api/graph/get-maximum-average-blood-sugar-week", { weekDays });
            if (!data) throw new Error("Couldn't receive data from axios POST 'get-maximum-average-blood-sugar-week' ");
            const { maxBloodSugar, weekBloodSugar } = data;
            setMaxSummary(maxBloodSugar);
            setWeekSummary(weekBloodSugar);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const weekDays = {
            sunday: week.clone().startOf('week').format('YYYY-MM-DD'),
            mondy: week.clone().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
            tuesday: week.clone().startOf('week').add(2, 'days').format('YYYY-MM-DD'),
            wednesday: week.clone().startOf('week').add(3, 'days').format('YYYY-MM-DD'),
            thursday: week.clone().startOf('week').add(4, 'days').format('YYYY-MM-DD'),
            friday: week.clone().startOf('week').add(5, 'days').format('YYYY-MM-DD'),
            saturday: week.clone().startOf('week').add(6, 'days').format('YYYY-MM-DD'),
        }

        if (summaryTypeDisplay === SummaryTypeDisplay.BLOOD_SUGAR) {
            getMaximumAverageBloodSugarInWeek(weekDays);
        } else if (summaryTypeDisplay === SummaryTypeDisplay.CARBS) {
            getMaximumCarbsInWeek(weekDays);
        } else {
            getMaximumInsulinInWeek(weekDays);
        }

    }, [week]);

    return (
        <div className="week-summary-container">
            <h3>{summaryTypeDisplay}</h3>
            <div className="days">
                <DayContainer displayDay="א" dayValue={weekSummary?.sunday} maxValue={maxSummary} />
                <DayContainer displayDay="ב" dayValue={weekSummary?.monday} maxValue={maxSummary} />
                <DayContainer displayDay="ג" dayValue={weekSummary?.tuesday} maxValue={maxSummary} />
                <DayContainer displayDay="ד" dayValue={weekSummary?.wednesday} maxValue={maxSummary} />
                <DayContainer displayDay="ה" dayValue={weekSummary?.thursday} maxValue={maxSummary} />
                <DayContainer displayDay="ו" dayValue={weekSummary?.friday} maxValue={maxSummary} />
                <DayContainer displayDay="ז" dayValue={weekSummary?.saturday} maxValue={maxSummary} />
            </div>
        </div>
    );
}

export default WeekSummaryContainer;