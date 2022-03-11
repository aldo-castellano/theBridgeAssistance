import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.scss";
import { UserContextProvider } from "./context/UserContext";
import Main from "./views/main/Main";
import Nav from "./components/nav/nav";
import Form from "views/form";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/themeCofi";
import Login from "./views/login/login";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-user" element={<Form />} />
              <Route path="/add-course" element={<Form />} />
              <Route path="/add-participant" element={<Form />} />
            </Routes>
            <Nav></Nav>
          </BrowserRouter>
        </div>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;

