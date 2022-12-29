import { SummaryTypeDisplay } from "../WeekSummaryContainer";

interface DayContainerProps {
    displayDay: string,
    dayValue: number | null,
    maxValue?: any,
    day?: string,
    summaryTypeDisplay?: SummaryTypeDisplay,
    graphColor?: string 
}

const DayContainer: React.FC<DayContainerProps> = ({ displayDay, dayValue, maxValue, graphColor }) => {

    let barHeight;

    if (maxValue === dayValue && dayValue !== 0) {
        barHeight = '100%';
    } else if (dayValue !== null) {
        let temp = (dayValue! * 100) / maxValue;
        barHeight = `${temp}%`;
    } else {
        barHeight = "0%";
    }

    return (
        <div className="day-container">
            <p>
                {displayDay}
            </p>
            <div className="bar-container">
                <div style={{ height: barHeight }} className={`bar ${graphColor}`}>
                    <p>
                        {dayValue === 0 || dayValue === null ? "" : Math.round(dayValue!)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DayContainer;