import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import logo from "assets/img/thebridgelogo.svg";
import logol from "assets/img/lone-logo.png";

import { useSession } from "logic/useSession";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { loger, isLogged } = useSession();

  const userLogin = () => {
    //TODO: VALIDATE
    //TODO: ERROR MESSAGE
    loger({ login, password });
    setLogin("");
    setPassword("");
  };

  useEffect(() => {
    console.log(isLogged);
    if (isLogged) navigate("/");
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
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          label="Usuario"
        />
        <TextField
          variant="standard"
          label="Contraseña"
          type="password"
          value={password}
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
