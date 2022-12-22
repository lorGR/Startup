import axios from "axios";
import { useEffect, useState } from "react";
import { SummaryTypeDisplay } from "../WeekSummaryContainer";

interface DayContainerProps {
    displayDay: string,
    dayValue: number | null,
    maxValue?: any,
    day?: string,
    summaryTypeDisplay?: SummaryTypeDisplay
}

const DayContainer: React.FC<DayContainerProps> = ({ displayDay, dayValue, maxValue }) => {

    let barHeight;

    if (dayValue === null) {
        barHeight = "0%"
        dayValue = 0;
    }

    if (maxValue === dayValue && dayValue !== 0) {
        barHeight = '100%';
    } else {
        let temp = (dayValue * 100) / maxValue;
        barHeight = `${temp}%`;
    }

    return (
        <div className="day-container">
            <p>
                {displayDay}
            </p>
            <div className="bar-container">
                <div style={{ height: barHeight }} className="bar"></div>
            </div>
            <p>
                {dayValue}
            </p>
        </div>
    );
}

export default DayContainer;