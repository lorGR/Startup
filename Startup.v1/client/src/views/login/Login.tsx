import React, { FormEventHandler } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

export const Login = () => {
    const navigate = useNavigate();
    async function handleLogin(event:any) {
        try {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            if(!email || !password) throw new Error("no email or password provided by client on login");

            const {data} = await axios.post("/api/users/login", {email, password});
            const {loggedIn} = data;
            loggedIn ? navigate("/home") : console.log("failed to log in")
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="login-page">
      <Header headerType="login"/>
      <form dir="rtl" className="container" onSubmit={handleLogin}>
        <input className="input_big" type="email" name="email" placeholder="הכנס/י כתובת דואר אלקטרוני" />
        <input className="input_big" type="password" name="password" placeholder="הכנס/י סיסמא" autoComplete="false" />
        <button className="button_input" type="submit">התחבר/י</button>
      </form>
    </div>
  );
};
