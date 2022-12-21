export enum SummaryType {
    BLOOD_SUGAR = "ממוצע סוכר יומי",
    CARBS = "סה״כ פחמימות יומי",
    INSULIN = "סה״כ אינסולין יומי"
}


interface WeekSummaryContainerProps {
    summaryType: SummaryType
}

const WeekSummaryContainer: React.FC<WeekSummaryContainerProps> = ({ summaryType }) => {
  return (
    <div className="week-summary-container">
        <h3>{summaryType}</h3>
        <div className="days">
            <p className="days__day">א</p>
            <p className="days__day">ב</p>
            <p className="days__day">ג</p>
            <p className="days__day">ד</p>
            <p className="days__day">ה</p>
            <p className="days__day">ו</p>
            <p className="days__day">ש</p>
        </div>
    </div>
  )
}

export default WeekSummaryContainer;