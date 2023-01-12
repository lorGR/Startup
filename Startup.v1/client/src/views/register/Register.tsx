import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../features/user/userModel";
import hebrew from "../../assets/images/settings/flags/israel.svg";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";

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

      const language = event.target.elements.language.value;

      const { data } = await axios.post("/api/users/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        identityNumber,
        language,
      });
      const { register } = data;

      register
        ? navigate("/user-information-2")
        : console.error("register failed");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="settings">
      <Header headerType="settings-register" />
      <form className="container" onSubmit={handleRegister}>
        <select className="input_big" name="language">
          <option value={Language.HEBREW}>עברית</option>
          <option disabled value={Language.ENGLISH}>English</option>
        </select>
        <input
          className="input_big"
          type="text"
          name="firstNameInput"
          placeholder="Enter your Name:"
        />
        <input
          className="input_big"
          type="text"
          name="lastNameInput"
          placeholder="Enter your Last Name:"
        />
        <input
          className="input_big"
          type="number"
          name="identityNumberInput"
          placeholder="Enter Your ID"
        />
        <input
          className="input_big"
          type="email"
          name="emailInput"
          placeholder="Enter Your Email"
        />
        <input
          className="input_big"
          type="password"
          name="passwordInput"
          placeholder="Enter Password"
          autoComplete="false"
        />
        <input
          className="input_big"
          type="password"
          name="confirmPasswordInput"
          placeholder="Please Repeat Password:"
          autoComplete="false"
        />
        <input
          className="input_big"
          type="text"
          name="image"
          placeholder="Enter Image Url"
        />
        <button className="button_input" type="submit">SIGN UP</button>
      </form>
    </div>
  );
};
