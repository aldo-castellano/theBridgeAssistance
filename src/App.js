import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "styles.scss";
import { UserContextProvider } from "context/UserContext";
import Main from "views/main/Main";
import Nav from "components/nav/nav";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/themeCofi";
import Login from "views/login/login";
import { Courses } from "views/courses";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Main />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
            {/* TODO: SHOW BASED ON USER CONTEXT (LOGIN) */}
            {/* <Nav></Nav> */}
          </BrowserRouter>
        </div>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
