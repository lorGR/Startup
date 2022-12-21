import React, { FormEventHandler } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Enter Email" />
        <input type="password" name="password" placeholder="Enter Password" autoComplete="false" />
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};
