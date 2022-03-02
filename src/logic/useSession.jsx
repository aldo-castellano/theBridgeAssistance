import React, { useState, useCallback, useContext } from "react";
import Context from "../context/UserContext";
import loginSrv from "../services/login";

export const useSession = () => {
  const { jwt, setJWT } = useContext(Context);
  const login = useCallback(
    ({ username, password }) => {
      // setState({ loading: true, error: false });
      loginSrv({ username, password })
        .then((jwt) => {
          window.sessionStorage.setItem("jwt", jwt);
          // setState({ loading: false, error: false });
          setJWT(jwt);
          console.log(jwt);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("jwt");
          // setState({ loading: false, error: true });
          console.error(err);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);

  return { logout, login, isLogged: jwt != 0 };
};
