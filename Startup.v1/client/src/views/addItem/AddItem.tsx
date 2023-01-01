import React from "react";
import Header from "../../components/header/Header";
import Navbar from "./../../components/navbar/Navbar";

const AddItem = () => {
  return (
    <div className="home">
      <Header headerType="newItem" />
      <Navbar navbarType="main" disabled={"disabled"} />
      <div className="container">
        <form>
          <input type="text" placeholder="הזן שם לפריט" />
        </form>
      </div>
    </div>
  );
};

export default AddItem;
