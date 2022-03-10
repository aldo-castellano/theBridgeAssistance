import { useCallback, useContext } from "react";
import Context from "context/UserContext";
import loginSrv from "services/login";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const navigate = useNavigate();
  const { jwt, setJWT, setUser } = useContext(Context);
  const loger = useCallback(
    ({ login, password }) => {
      // setState({ loading: true, error: false });
      loginSrv({ login, password })
        .then(({ token, login, id }) => {
          window.sessionStorage.setItem("jwt", token);
          window.sessionStorage.setItem("user", { login, id });
          // setState({ loading: false, error: false });
          setJWT(token);
          setUser({ login, id });
        })
        .catch((err) => {
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

  return { logout, loger, isLogged: Boolean(jwt) };
};
