import DayContainer from "./dayContainer/DayContainer";

export enum SummaryTypeDisplay {
    BLOOD_SUGAR = "ממוצע סוכר יומי",
    CARBS = "סה״כ פחמימות יומי",
    INSULIN = "סה״כ אינסולין יומי"
}


interface WeekSummaryContainerProps {
    summaryTypeDisplay: SummaryTypeDisplay,
    week: any
}

const WeekSummaryContainer: React.FC<WeekSummaryContainerProps> = ({ summaryTypeDisplay, week }) => {

    return (
        <div className="week-summary-container">
            <h3>{summaryTypeDisplay}</h3>
            <div className="days">
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