import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Screen } from "./components/screen/Screen.styled";
import { Container } from "./components/container/Container.styled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/login/Login";
import { Register } from './views/register/Register';

function App() {
  return (
    <Container>
      <Screen>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      </Screen>
    </Container>
  );
}

export default App;
