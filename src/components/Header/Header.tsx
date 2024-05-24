import "./Header.css";
import React, {useContext} from "react";
import {AuthContext} from "../../context/authContext.js";

const Header = () => {
    const {authUser,  logout}= useContext(AuthContext);
  return (
    <div
      style={{
        height: "100px", // wysokość 100px
        width: "100%", // szerokość 100%
        backgroundColor: "black", // kolor tła
        display: "flex", // flexbox
        justifyContent: "center", // wyśrodkowanie w poziomie
        alignItems: "center", // wyśrodkowanie w pionie
        gap: "100px", // odstęp między elementami
      }}
    >
      Header, Hello {authUser.username}
      <span onClick={() => logout()}>Wyloguj</span>
    </div>
  );
};

export default Header;
