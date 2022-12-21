import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";
import WeekSummaryContainer, { SummaryTypeDisplay } from "../../components/weekSummaryContainer/WeekSummaryContainer";

const Graph = () => {

    const [week, setWeek] = useState<any>(moment());
    const [weekOverview, setWeekOverview] = useState<any>();

    useEffect(() => {
        const startWeek = week.clone().startOf('week');
        const endWeek = week.clone().endOf('week');
        setWeekOverview(`${startWeek.format('DD/MM/YY')} - ${endWeek.format('DD/MM/YY')}`);
    }, [week]);

    const handleFowardWeek = () => {
        const startWeek = week.clone().startOf('week');
        const nextWeek = moment(startWeek).add(1, 'week');
        setWeek(nextWeek);
    }

    const handleBackWeek = () => {
        const startWeek = week.clone().startOf('week');
        const backWeek = moment(startWeek).subtract(1, 'week');
        setWeek(backWeek);
    }

    return (
        <div className="graph">
            <Header headerType="calendar" />
            <Navbar navbarType="calendar" />
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleFowardWeek}>&lt;</button>
                    <span>{weekOverview}</span>
                    <button onClick={handleBackWeek}>&gt;</button>
                </div>
                <p>סיכום שבוע</p>
                <div className="summary-container">
                    <WeekSummaryContainer summaryTypeDisplay={SummaryTypeDisplay.BLOOD_SUGAR} week={week} />
                    <WeekSummaryContainer summaryTypeDisplay={SummaryTypeDisplay.CARBS} week={week} />
                    <WeekSummaryContainer summaryTypeDisplay={SummaryTypeDisplay.INSULIN} week={week} />
                </div>
            </div>
        </div>
    );
}

export default Graph;