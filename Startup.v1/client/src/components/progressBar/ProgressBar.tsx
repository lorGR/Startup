import { useEffect, useState } from "react";
import { Meal } from "../../views/home/Home";

interface ProgressBarProps {
    meals: Array<Meal>
}

const ProgressBar: React.FC<ProgressBarProps> = ({ meals }) => {

    const [totalCarbs, setTotalCarbs] = useState<number>(0);
    const [carbsGoal, setCarbsGoal] = useState<number>(220);
    const [barPrecentages, setBarPrecentages] = useState<number>(0);



    const getTotalCarbs = () => {
        try {
            let myCarbs = 0;
            meals.forEach(meal => {
                myCarbs += meal.carbs;
            });
            setTotalCarbs(myCarbs);
            console.log('finished')
        } catch (error) {
            console.error(error);
        }
    }

    const getBarPrecentages = () => {
        try {
            console.log("hello");
            console.log(totalCarbs);
            setBarPrecentages(Math.round((totalCarbs * 100)/carbsGoal));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTotalCarbs();
        getBarPrecentages();
    }, [meals]);

    return (
        <div className="progress-bar">
            <div id="myProgress">
                    <div className="progress-bar__info">
                        <span className="progress-bar__icon">🍎</span>
                        <span className="progress-bar__amount">{totalCarbs}/{carbsGoal}</span>
                        <span className="progress-bar__precenteges">{barPrecentages}%</span>
                    </div>
                <div style={{width: `${barPrecentages}%`}} id="myBar">
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;