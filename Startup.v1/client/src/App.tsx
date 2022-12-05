import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Screen } from "./components/screen/Screen.styled";
import { Container } from "./components/container/Container.styled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/login/Login";
import { Register } from './views/register/Register';
import UserAgreement from "./views/userAgreement/UserAgreement";
import Intro from "./views/intro/Intro";
import { UserInfo } from './views/userInformation/UserInfo';
import Home from "./views/home/Home";
import Favorites from "./views/favorites/Favorites";
import List from "./views/list/List";

function App() {
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
          </Routes>
        </BrowserRouter>
      </Screen>
    </Container>
  );
}

export default App;
