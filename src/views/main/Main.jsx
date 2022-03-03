import React from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "../../logic/useSession";

const Main = () => {
  const navigate = useNavigate();
  const { login, logout } = useSession();
  const handleclick = () => {
    //! logout function gives problems
    login({});
    navigate("/login");
  };
  return (
    <>
      <h2>Main</h2>
      <button onClick={() => handleclick()}>logout</button>
    </>
  );
};
export default Main;
