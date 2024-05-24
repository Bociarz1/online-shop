import React, {ReactNode, useContext} from "react";
import {AuthContext} from "../../context/authContext";

const AppWrapper = ({ children }:{children: ReactNode}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
