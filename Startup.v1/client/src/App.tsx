import "./App.scss";
import { Screen } from "./components/screen/Screen.styled";
import { Container } from "./components/container/Container.styled";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./views/login/Login";
import { Register } from './views/register/Register';
import Intro from "./views/intro/Intro";
import { UserInfo } from './views/userInformation/UserInfo';
import Home from "./views/home/Home";
import Favorites from "./views/favorites/Favorites";
import List from "./views/list/List";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { getUserByCookie } from "./features/user/userAPI";
import { userSelector } from "./features/user/userSlice";
import { FoodList } from './components/foodList/FoodList';
import Calendar from "./views/calendar/Calendar";
import { addFood } from "./features/food/foodArraySlice";
import AddUserFood from './views/addUserFood/AddUserFood';
import Graph from "./views/graph/Graph";
import AddItem from './views/addItem/AddItem';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  return (
    <Container>
      <Screen>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-information" element={<UserInfo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/list" element={<List />} />
            <Route path="/foodlist" element={<FoodList />} />
            <Route path="/calendar" element={<Calendar />}/>
            <Route path="/add-food" element={<AddUserFood/>}/>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </BrowserRouter>
      </Screen>
    </Container>
  );
}

export default App;
