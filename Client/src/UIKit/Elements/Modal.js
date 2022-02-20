import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancle} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
        <Button onClick={props.onCancle}>Cancle</Button>
      </footer>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} onCancle={props.onCancle} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onCancle={props.onCancle}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
