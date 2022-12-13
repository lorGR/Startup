import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { barProgressFormSelector, setBarProgressFormDisplay } from "../../features/barProgressForm/barProgressFormSlice";
import { getUserByCookie } from "../../features/user/userAPI";
import { userSelector } from "../../features/user/userSlice";
import { DisplaySetting } from "../header/Header";


const SetBarProgressForm = () => {

  const barProgressFormDisplay = useAppSelector(barProgressFormSelector);
  const user = useAppSelector(userSelector);

  const dispatch = useAppDispatch();

  const handleChangeBarProgressGoal = async (event: any) => {
    try {
      event.preventDefault();
      const userCarbsGoal = event.target.elements.carbsGoal.value;
      const { data } = await axios.patch("/api/users/update-user-carbs-goal", { userCarbsGoal });
      if(!data) throw new Error("Couldn't receive data from axios PATCH 'update-user-carbs-goal' ");
      const { result } = data;
      if(result.affectedRows > 0) {
        dispatch(getUserByCookie());
      }

      dispatch(setBarProgressFormDisplay(DisplaySetting.NONE));
    } catch (error) {
      console.log(event);
    }
  }

  //TODO: big one 
  // - add to user table col named carbsGoal
  // - when changing carbsGoal change it to the user as well 
  // - because the refresh returns the state to it's default (200)
  // - need to save the carbs goal in user table to make more dynamic

  return (
    <div className="set-bar-progress-form" style={{ display: `${barProgressFormDisplay}` }}>
      <form onSubmit={handleChangeBarProgressGoal}>
        <button type="button" onClick={() => { dispatch(setBarProgressFormDisplay(DisplaySetting.NONE)) }}>X</button>
        <button>✅</button>
        <input type="number" name="carbsGoal" placeholder="הגדר את היעד היומי" min={1}/>
      </form>
    </div>
  )
}

export default SetBarProgressForm;