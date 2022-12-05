import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../features/user/userModel";
import hebrew from "../../assets/images/settings/flags/israel.svg"


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

      const language = event.target.elements.language.value

      const { data } = await axios.post("/api/users/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        identityNumber,
        language
      });
      const { register } = data;

      register ? navigate("/user-inforamtion") : console.log("register failed");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <select name="language">
            <option value={Language.HEBREW}>עברית</option>
            <option value={Language.ENGLISH}>English</option>
        </select>
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
        <input type="text" name="image" placeholder="Enter Image Url"/>
        <button type="submit">SIGN UP</button>

      </form>
    </div>
  );
};
