import React from "react";
import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/main/Main";
import Nav from "./components/nav/Nav";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/themeCofi";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <BrowserRouter> */}
      {/* <Routes>
          <Route path="/" element={<Main />} />
      </Routes>
      <Nav></Nav>
      {/* </BrowserRouter> */}
    </ThemeProvider>
  );
};

export default App;
