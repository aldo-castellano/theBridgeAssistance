import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "logic/useSession";

const Main = () => {
  const navigate = useNavigate();
  const { isLogged, logout } = useSession();

  useEffect(() => {
    if (!isLogged) navigate("/login");
    else navigate("/courses");
  }, [isLogged, navigate]);

  return (
    <>
      <h2>Main</h2>
    </>
  );
};
export default Main;
