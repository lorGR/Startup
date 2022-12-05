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

function App() {
  return (
    <Container>
      <Screen>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user-information" element={<UserInfo/>}/>
        </Routes>
      </BrowserRouter>
      </Screen>
    </Container>
  );
}

export default App;
