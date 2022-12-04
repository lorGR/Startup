import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  async function handleRegister(event: any) {
    try {
      event.preventDefault();
      const {
        emailInput,
        firstNameInput,
        lastNameInput,
        passwordInput,
        confirmPasswordInput,
        identityNumberInput,
      } = event.target.elements;

      const [
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        identityNumber,
      ] = [
        emailInput.value,
        firstNameInput.value,
        lastNameInput.value,
        passwordInput.value,
        confirmPasswordInput.value,
        identityNumberInput.value,
      ];

      const { data } = await axios.post("/api/users/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        identityNumber,
      });
      const { register } = data;

      register ? navigate("/home") : console.log("register failed");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="firstNameInput"
          placeholder="Enter your Name:"
        />
        <input
          type="text"
          name="lastNameInput"
          placeholder="Enter your Last Name:"
        />
        <input
          type="number"
          name="identityNumberInput"
          placeholder="Enter Your ID"
        />
        <input type="email" name="emailInput" placeholder="Enter Your Email" />
        <input
          type="password"
          name="passwordInput"
          placeholder="Enter Password"
        />
        <input
          type="password"
          name="confirmPasswordInput"
          placeholder="Please Repeat Password:"
        />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};
