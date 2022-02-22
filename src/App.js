import React from "react";
import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/main/Main";
import Nav from "./components/nav/Nav";

const App = () => {
  return (
    <div className="container">
      {/* <BrowserRouter> */}
      {/* <Routes>
          <Route path="/" element={<Main />} />
        </Routes> */}
      <Nav></Nav>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
