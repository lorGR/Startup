import axios from "axios";
import { useEffect, useState } from "react";
import DayContainer from "./dayContainer/DayContainer";

export enum SummaryTypeDisplay {
    BLOOD_SUGAR = "馃└ 诪诪讜爪注 住讜讻专 讬讜诪讬",
    CARBS = "馃崕 住讛状讻 驻讞诪讬诪讜转 讬讜诪讬",
    INSULIN = "馃拤 住讛状讻 讗讬谞住讜诇讬谉 讬讜诪讬"
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
    const [graphColor, setGraphColor] = useState<string>();

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
            monday: week.clone().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
            tuesday: week.clone().startOf('week').add(2, 'days').format('YYYY-MM-DD'),
            wednesday: week.clone().startOf('week').add(3, 'days').format('YYYY-MM-DD'),
            thursday: week.clone().startOf('week').add(4, 'days').format('YYYY-MM-DD'),
            friday: week.clone().startOf('week').add(5, 'days').format('YYYY-MM-DD'),
            saturday: week.clone().startOf('week').add(6, 'days').format('YYYY-MM-DD'),
        }

        if (summaryTypeDisplay === SummaryTypeDisplay.BLOOD_SUGAR) {
            getMaximumAverageBloodSugarInWeek(weekDays);
            setGraphColor("red");
        } else if (summaryTypeDisplay === SummaryTypeDisplay.CARBS) {
            getMaximumCarbsInWeek(weekDays);
            setGraphColor("green");
        } else {
            getMaximumInsulinInWeek(weekDays);
            setGraphColor("purple");
        }

    }, [week]);

    return (
        <div className="week-summary-container">
            <h3>{summaryTypeDisplay}</h3>
            <div className="days">
                <DayContainer displayDay="讗" dayValue={weekSummary?.sunday} maxValue={maxSummary} graphColor={graphColor}/>
                <DayContainer displayDay="讘" dayValue={weekSummary?.monday} maxValue={maxSummary} graphColor={graphColor}/>
                <DayContainer displayDay="讙" dayValue={weekSummary?.tuesday} maxValue={maxSummary} graphColor={graphColor}/>
                <DayContainer displayDay="讚" dayValue={weekSummary?.wednesday} maxValue={maxSummary} graphColor={graphColor}/>
                <DayContainer displayDay="讛" dayValue={weekSummary?.thursday} maxValue={maxSummary} graphColor={graphColor}/>
                <DayContainer displayDay="讜" dayValue={weekSummary?.friday} maxValue={maxSummary} graphColor={graphColor}/>
                <DayContainer displayDay="砖" dayValue={weekSummary?.saturday} maxValue={maxSummary} graphColor={graphColor}/>
            </div>
        </div>
    );
}

export default WeekSummaryContainer;