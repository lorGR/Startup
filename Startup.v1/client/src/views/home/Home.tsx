import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Menu from "../../components/menu/Menu";

import { userSelector } from "../../features/user/userSlice";
import { getUserByCookie } from "../../features/user/userAPI";

const Home = () => {
  
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  
  const [addMealForm, setAddMealForm] = useState(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);


  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  return (
    <div className="home">
      <Header
        headerType="addVals"
        addMealForm={addMealForm}
        setAddMealForm={setAddMealForm}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      <Navbar navbarType="main" />
      {showMenu && <Menu />}
    </div>
  );
};

export default Home;
