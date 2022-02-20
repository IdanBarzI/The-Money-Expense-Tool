import React from "react";
import { Icon } from "..";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.icon}>
        <div className={classes.tooltip}> Facebook</div>
        <span>
          <i className="fab fa-facebook-f"></i>
        </span>
      </div>

      <div className={classes.icon}>
        <div className={classes.tooltip}> Twitter</div>
        <span>
          <i className="fab fa-twitter"></i>
        </span>
      </div>

      <div className={classes.icon}>
        <div className={classes.tooltip}> Instagram</div>
        <span>
          <i className="fab fa-instagram"></i>
        </span>
      </div>

      <div className={classes.icon}>
        <div className={classes.tooltip}> Github</div>
        <span>
          <i className="fab fa-github"></i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
