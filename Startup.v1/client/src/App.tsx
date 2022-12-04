import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Screen } from "./components/screen/Screen.styled";
import { Container } from "./components/container/Container.styled";

function App() {
  return (
    <Container>
      <Screen></Screen>
    </Container>
  );
}

export default App;
