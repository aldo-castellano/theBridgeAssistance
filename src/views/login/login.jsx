import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "logic/useSession";
import { TextField, Button } from "@mui/material";
import logo from "assets/img/thebridgelogo.svg";
import logol from "assets/img/lone-logo.png";

const Login = () => {
  const navigate = useNavigate();
  // const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoginLoading, hasLoginError, login, isLogged } = useSession();

  const userLogin = () => {
    //TODO: VALIDATE
    //TODO: SUCCESS/ERROR MESSAGE
    login({ username, password });
  };

  useEffect(() => {
    console.log(isLogged);
    if (isLogged) {
      navigate("/");
    } else {
      console.log("bad credentials");
    }
  }, [isLogged, navigate]);

  return (
    <>
      <div className="nav login">
        <div className="nav-logo-container">
          <img src={logo} alt="logo" />
          <h2>ASSISTANCE</h2>
        </div>
      </div>
      <div className="login-field">
        <img className="logo" src={logol} alt="logo" />
        <h2>INICIA SESION</h2>
        <TextField
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}
          label="Usuario"
        />
        <TextField
          variant="standard"
          label="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
