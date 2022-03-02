import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/themeCofi";
import "./styles.scss";

import Main from "./views/main/Main";
import { Courses } from "views/courses";
import Nav from "./components/nav/nav";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/courses/:user" element={<Courses />} />
        </Routes>
        <Nav></Nav>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
