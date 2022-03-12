import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SpeedDial from "@mui/material/SpeedDial";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import logo from "assets/img/thebridgelogo.svg";
import { useSession } from "logic/useSession";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { isLogged, logout } = useSession();
  const handleClick = (text) => {
    if (text == "Logout") logout();
  };

  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      className="nav-menu"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(!state)}
      onKeyDown={toggleDrawer(!state)}
    >
      <List>
        {["Inbox", "Starred", "Drafts", "Logout"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText
              onClick={() => handleClick(text)}
              className="text-nav"
              primary={text}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="nav">
      <div className={`nav-logo ${isLogged ? "" : "login"}`}>
        <div>
          <img src={logo} alt="logo" />
          <h2>ASSISTENSE</h2>
        </div>
      </div>
      {isLogged && (
        <React.Fragment>
          <SpeedDial
            onClick={toggleDrawer(!state)}
            ariaLabel="SpeedDial basic example"
            sx={{
              position: "fixed",
              bottom: 40,
              right: 0,
              marginRight: "1rem",
              zIndex: "3000",
            }}
            icon={<DragHandleIcon />}
          ></SpeedDial>

          <Drawer anchor="right" open={state} onClose={toggleDrawer(!state)}>
            {list("right")}
          </Drawer>
        </React.Fragment>
      )}
    </div>
  );
}
