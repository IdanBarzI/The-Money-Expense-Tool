import { NavLink } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import classes from "./NavBar.module.css";
import AppContext from "../../context/AppContext";

const NavBar = (props) => {
  const context = useContext(AppContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}></div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/settings"
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/add-expense"
            >
              Add Expense
            </NavLink>
          </li>

          {context.user && (
            <li className={classes.userDetiles}>
              <div className={classes.userName}>{context.user.name}</div>
              <div className="money">{context.user.balance}$</div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
