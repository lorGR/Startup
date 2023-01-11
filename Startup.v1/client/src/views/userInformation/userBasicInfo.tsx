import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../features/user/userModel";
import hebrew from "../../assets/images/settings/flags/israel.svg";
import { useAppSelector } from "../../app/hooks";
import { updateFirstName, updateIdentityNumber, updateLastName, updateProfileImage, userSelector } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Menu from "../../components/menu/Menu";

export const UserBasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  console.log(user)

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [identityNumber, setIdentityNumber] = useState(user?.identity_number);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [counter, setCounter] = useState(0)

  async function handleUpdate(event: any) {
    try {
      event.preventDefault();

      const { data } = await axios.post("/api/users/update-information", {
        firstName,
        lastName,
        identityNumber,
      });
      const { result } = data;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user && counter === 0) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setIdentityNumber(user.identity_number);
      setCounter(1)
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  return (
    <div className="settings">
      <Header showMenu={showMenu} setShowMenu={setShowMenu} headerType="settings" />
      <Navbar navbarType="settings" />
      <form className="container" onSubmit={handleUpdate}>
        <select className="input_big" name="language">
          <option value={Language.HEBREW}>עברית</option>
          <option disabled value={Language.ENGLISH}>
            English
          </option>
        </select>
        <div className="container__up">
          <div className="container__up__left">
            <input onChange={(ev) => { updateProfileImage(ev.target.value) }} className="imageInput" type="text" name="image" />
          </div>
          <div className="container__up__right">
            <input
              type="text"
              name="firstNameInput"
              placeholder="Enter your Name:"
              value={firstName}
              onChange={(ev: any) => {
                setFirstName(ev.target.value);
                console.log("after set state, before reducer action")
                dispatch(updateFirstName(ev.target.value))
              }}
              className="input_small"
            />
            <input
              type="text"
              name="lastNameInput"
              placeholder="Enter your Last Name:"
              value={lastName}
              onChange={(ev: any) => {
                setLastName(ev.target.value);
                dispatch(updateLastName(ev.target.value))
              }}
              className="input_small"
            />
            <input
              type="number"
              name="identityNumberInput"
              placeholder="Enter Your ID"
              value={identityNumber}
              onChange={(ev: any) => {
                setIdentityNumber(ev.target.value);
                dispatch(updateIdentityNumber(ev.target.value))
              }}
              className="input_small"
            />
          </div>
        </div>
        {/* <button className="button_input" type="submit">עדכן</button> */}
      </form>
      {showMenu && <Menu />}
    </div>
  );
};
