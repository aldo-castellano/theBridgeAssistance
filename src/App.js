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
import UserList from "views/userList";
import { Redirect } from "components/redirect";
import { NoMatch } from "views/nomatch";
import Assistant from "views/assistance/Assistance";
import MainAssistant from "views/assistance/mainAssistance";

const App = () => {
  // const { isLogged } = useSession();
  return (
    <div className="container-main">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Main />} />
              <Route path="/add-user" element={<Form />} />
              <Route path="/add-course" element={<Form />} />
              <Route path="/add-participant" element={<Form />} />
              <Route path="/edit-user" element={<Form />} />
              <Route path="/edit-course" element={<Form />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/addclass" element={<Assistant />} />
              <Route path="/checkclass" element={<Assistant />} />
              <Route path="/class" element={<MainAssistant />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            <Redirect />
            <Nav></Nav>
          </BrowserRouter>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
