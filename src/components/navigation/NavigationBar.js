import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import logoIcon from "../../assets/icons/Logo.svg";
import { Avatar, Box } from "@material-ui/core";

export function NavigationBar(props) {
  return (
    <nav className={classes.nav}>
      <Box flexGrow={1}>
        <NavLink to="/" activeClassName={classes.active}>
          <img src={logoIcon} alt="" />
        </NavLink>
      </Box>
      <Avatar style={{ height: "48px", width: "48px" }} />
    </nav>
  );
}
