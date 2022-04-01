import { useCallback, useContext } from "react";
import Context from "context/UserContext";
import loginSrv from "services/login";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const navigate = useNavigate();
  const { jwt, setJWT, user, setUser } = useContext(Context);
  let alerta = "alert inicial";
  const loger = useCallback(
    ({ login, password }) => {
      // setState({ loading: true, error: false });
      loginSrv({ login, password })
        .then(({ token, rol, login, id }) => {
          window.sessionStorage.setItem("jwt", token);
          window.sessionStorage.setItem("user", [id, login, rol]);
          // setState({ loading: false, error: false });
          setJWT(token);
          //console.log([id, login, rol])
          setUser([id, login, rol]);
        })
        .catch((err) => {          
          alerta = true;          
          window.sessionStorage.removeItem("jwt");
          window.sessionStorage.removeItem("user");
          // setState({ loading: false, error: true });
          console.error(err);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    window.sessionStorage.removeItem("user");
    setJWT(null);
    setUser(null);
    navigate("/login");
  }, [setJWT]);

  return { user, logout, loger, isLogged: Boolean(jwt), alerta };
};
