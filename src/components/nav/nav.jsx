import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SpeedDial from "@mui/material/SpeedDial";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import logo from "assets/img/thebridgelogo.svg";

export default function Nav(props) {
  const [state, setState] = useState(false);
  const [location] = useState(useLocation().pathname);

  useEffect(() => {
    location === "/login" ? props.location(false) : props.location(true);
  }, [location]);
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
      // sx={{ width: "20vw" }}
      role="presentation"
      onClick={toggleDrawer(!state)}
      onKeyDown={toggleDrawer(!state)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText className="text-nav" primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="">
      <div className="nav">
        <div className="container">
          <div className="nav-logo">
            <div>
              <img src={logo} alt="logo" />
              <h2>ASSISTENSE</h2>
            </div>
          </div>
        </div>
      </div>
      <React.Fragment>
        <SpeedDial
          onClick={toggleDrawer(!state)}
          ariaLabel="SpeedDial basic example"
          className="button-menu container"
          sx={{
            position: "fixed",
            bottom: 40,
            alignItems: "flex-end",
            zIndex: "3000",
          }}
          icon={<DragHandleIcon />}
        ></SpeedDial>

        <Drawer anchor="right" open={state} onClose={toggleDrawer(!state)}>
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
