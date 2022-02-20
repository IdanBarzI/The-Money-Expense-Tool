import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./SnackBar.module.css";

const SnackBar = (props) => {
  const [show, setShow] = useState(false);
  const delay = props.delay || 3;

  useEffect(() => {
    setShow(true);
    let timer1 = setTimeout(() => setShow(false), delay * 1000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={`${classes.snackBar} ${show && classes.show} `}>
          <div>{props.text}</div>
        </div>,
        document.getElementById("snackbar-root")
      )}
    </>
  );
};

export default SnackBar;
