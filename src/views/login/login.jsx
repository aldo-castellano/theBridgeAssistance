import React from "react";

import { TextField, Button } from "@mui/material";
import logo from "../../assets/img/thebridgelogo.png";

const Login = () => {
  const userLogin = () => {
    //GET INPUT INFO
    //VALIDATE
    //ENCRYPT PASSWORD
    //SEND TO BACKEND
    //AWAIT RESPONSE
    //SUCCESS/ERROR MESSAGE
    //REPIT/REDIRECT
  };

  return (
    <>
      <div className="nav login">
        <div className="nav-logo-container">
          <img src={logo} alt="logo" />
          <h2>ASSISTANCE</h2>
        </div>
      </div>
      <div className="login-field">
        <img src={logo} alt="logo" />
        <h2>INICIA SESION</h2>
        <TextField variant="standard" label="Usuario" />
        <TextField variant="standard" label="Contraseña" />
        <Button
          onClick={() => userLogin()}
          variant="contained"
          size="large"
          sx={{
            paddingX: 10,
          }}
        >
          Login
        </Button>
      </div>
    </>
  );
};
export default Login;
//! BORDER RADIUS HARDCORED
//! WRONG LOGO
//* VALIDATE -> AXIOS -> BACk -> DB -> RESP
