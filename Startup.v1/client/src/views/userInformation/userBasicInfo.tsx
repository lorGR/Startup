import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../features/user/userModel";
import hebrew from "../../assets/images/settings/flags/israel.svg";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlice";
import { useAppDispatch } from './../../app/hooks';
import { getUserByCookie } from './../../features/user/userAPI';

export const UserBasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector)
  console.log(user)

  const [firstName, setFirstName] = useState(user?.first_name)
  const [lastName, setLastName] = useState(user?.last_name)
  const [identityNumber, setIdentityNumber] = useState(user?.identity_number)
  
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

  useEffect(()=> {
    if(user) {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setIdentityNumber(user.identity_number)
    }
  },[user])

  useEffect(()=>{
    dispatch(getUserByCookie())
  },[])


  return (
    <div>
      <form onSubmit={handleUpdate}>
        <select name="language">
          <option value={Language.HEBREW}>עברית</option>
          <option disabled value={Language.ENGLISH}>
            English
          </option>
        </select>
        <input
          type="text"
          name="firstNameInput"
          placeholder="Enter your Name:"
          value={firstName}
          onChange={(ev:any) => {setFirstName(ev.target.value)}}
        />
        <input
          type="text"
          name="lastNameInput"
          placeholder="Enter your Last Name:"
          value={lastName}
          onChange={(ev:any) => {setLastName(ev.target.value)}}
        />
        <input
          type="number"
          name="identityNumberInput"
          placeholder="Enter Your ID"
          value={identityNumber}
          onChange={(ev:any) => {setIdentityNumber(ev.target.value)}}
        />
        <input type="text" name="image" placeholder="Enter Image Url" />
        <button type="submit">עדכן</button>
      </form>
    </div>
  );
};
