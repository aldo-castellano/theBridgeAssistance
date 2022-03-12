import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import logol from "assets/img/lone-logo.png";

import { useSession } from "logic/useSession";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { loger, isLogged } = useSession();

  const trySubmit = (e) => {
    if (e.which == 13) userLogin();
  };

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
      <div className="login-field">
        <img className="logo" src={logol} alt="logo" />
        <h2>INICIA SESION</h2>
        <form className="login-form" onSubmit={userLogin}>
          <TextField
            className="input"
            variant="standard"
            value={login}
            onKeyPress={(e) => trySubmit(e)}
            onChange={(e) => setLogin(e.target.value)}
            label="Usuario"
          />
          <TextField
            className="input"
            variant="standard"
            label="Contraseña"
            type="password"
            value={password}
            onKeyPress={(e) => trySubmit(e)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={(e) => userLogin(e)}
            variant="contained"
            size="large"
            sx={{
              paddingX: 10,
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
export default Login;
