import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.scss";
import { UserContextProvider } from "./context/UserContext";
import Main from "./views/main/Main";
import Nav from "./components/nav/nav";
import Form from "views/form";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/themeCofi";
import Login from "views/login/login";
import { Courses } from "views/courses";
import UserList from "views/userList"

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
              <Route path="/edit-user" element={<Form />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/user-list" element={<UserList />} />
            </Routes>
            <Nav></Nav>
            {/* TODO: SHOW BASED ON USER CONTEXT (LOGIN) */}
            {/* <Nav></Nav> */}
          </BrowserRouter>
        </div>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;

