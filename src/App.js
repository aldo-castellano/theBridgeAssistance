import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "styles.scss";
import { UserContextProvider } from "context/UserContext";
import Main from "views/main/Main";
import Nav from "components/nav/nav";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/themeCofi";
import Login from "views/login/login";
import { Courses } from "views/courses";
import Assitance from "views/assistance/Assistance";

const App = () => {
  const [navRender, setNavRender] = useState(true);
  const handleChange = (renderState) => {
    setNavRender(renderState);
  };

  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Assitance />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
          {/* TODO: SHOW BASED ON USER CONTEXT (LOGIN) */}
          {navRender ? <Nav location={handleChange}></Nav> : null}
        </BrowserRouter>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
