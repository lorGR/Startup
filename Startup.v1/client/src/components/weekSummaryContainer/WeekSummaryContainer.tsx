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

const WeekSummaryContainer: React.FC<WeekSummaryContainerProps> = ({ summaryTypeDisplay, week }) => {

    const [maxSummary, setMaxSummary] = useState();
    const [weekSummary, setWeekSummary] = useState();

    const getMaximumCarbsInWeek = async (weekDays: Object) => {
        try {
            const { data } = await axios.post("/api/graph/get-maximum-carbs-week", { weekDays });
            if (!data) throw new Error("Couldn't receive data from axios POST 'get-maximum-carbs-week' ");
            const { maxCarbs, weekCarbs } = data;
            console.log(`Max carbs this week: ${maxCarbs}`);
            console.log(weekCarbs);
            
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
            console.log(`Max insulin this week: ${maxInsulin} `);
            console.log(weekInsulin);
        } catch (error) {
            console.error(error);
        }
    }

    const getMaximumAverageBloodSugarInWeek = async (weekDays: Object) => {
        try {
            const { data } = await axios.post("/api/graph/get-maximum-average-blood-sugar-week", { weekDays });
            if (!data) throw new Error("Couldn't receive data from axios POST 'get-maximum-average-blood-sugar-week' ");
            const { maxBloodSugar, weekBloodSugar } = data;
            console.log(`Max blood sugar this week: ${maxBloodSugar}`);
            console.log(weekBloodSugar);
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
                {summaryTypeDisplay === SummaryTypeDisplay.BLOOD_SUGAR &&
                    <>
                        {/* <DayContainer displayDay="א" />
                        <DayContainer displayDay="ב" />
                        <DayContainer displayDay="ג" />
                        <DayContainer displayDay="ד" />
                        <DayContainer displayDay="ה" />
                        <DayContainer displayDay="ו" />
                        <DayContainer displayDay="ש" /> */}
                    </>
                }
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'א'} day={week.clone().startOf('week').format('YYYY-MM-DD')} />
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'ב'} day={week.clone().startOf('week').add(1, 'days').format('YYYY-MM-DD')} />
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'ג'} day={week.clone().startOf('week').add(2, 'days').format('YYYY-MM-DD')} />
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'ד'} day={week.clone().startOf('week').add(3, 'days').format('YYYY-MM-DD')} />
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'ה'} day={week.clone().startOf('week').add(4, 'days').format('YYYY-MM-DD')} />
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'ו'} day={week.clone().startOf('week').add(5, 'days').format('YYYY-MM-DD')} />
                <DayContainer summaryTypeDisplay={summaryTypeDisplay} displayDay={'ש'} day={week.clone().endOf('week').format('YYYY-MM-DD')} />
            </div>
        </div>
    );
}

export default WeekSummaryContainer;