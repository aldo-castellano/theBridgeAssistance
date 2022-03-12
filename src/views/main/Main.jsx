import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "logic/useSession";

const Main = () => {
  const navigate = useNavigate();
  const { isLogged, logout } = useSession();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  return (
    <>
      <h2>Main</h2>
      <button onClick={() => logout()}>logout</button>
      <button onClick={() =>  navigate("/edit-course",{state:{
        id:"1aecb7b2-6da1-46f2-8827-6fafeb441b11"
      }})}>test</button>
      
    </>
  );
};
export default Main;
