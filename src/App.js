import React from "react";
import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/main/Main";
import Nav from "./components/nav/nav";
import Login from "./views/login/login";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Nav></Nav> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
