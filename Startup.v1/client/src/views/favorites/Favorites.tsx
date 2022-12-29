import { useState } from "react";

import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Menu from "../../components/menu/Menu";

const Favorites = () => {

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="favorites">
      <Header
        headerType="carbsDisplay"
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      <Navbar navbarType="main" />
      {showMenu && <Menu />}
    </div>
  )
}

export default Favorites;