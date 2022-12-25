import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";
import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import WeekSummaryContainer, { SummaryTypeDisplay } from "../../components/weekSummaryContainer/WeekSummaryContainer";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/Menu";

const Graph = () => {

    const [week, setWeek] = useState<any>(moment());
    const [weekOverview, setWeekOverview] = useState<any>();
    const [showMenu, setShowMenu] = useState<boolean>(false);

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
            <Header headerType="calendar" showMenu={showMenu} setShowMenu={setShowMenu} />
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
            {showMenu && <Menu />}
        </div>
    );
}

export default Graph;