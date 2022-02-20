import React, { useState, useReducer, useContext } from "react";
import {
  Input,
  Icon,
  LoadingSpinner,
  ComboxBox,
  Modal,
  Button,
} from "../../UIKit";
import { UPDATE_FORM, onFocusOut } from "../../formsUtils/UserForm";
import AppContext from "../../context/AppContext";
import classes from "./UserForm.module.css";

const list = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
];
const initialState = {
  name: { value: "", touched: false, hasError: false, error: "" },
  balance: { value: "", touched: false, hasError: false, error: "" },
  enteredDate: { value: null, touched: false, hasError: false, error: "" },
  isFormValid: true,
};

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };
    default:
      return state;
  }
};

const UserForm = (props) => {
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const context = useContext(AppContext);

  const handleBalanceSelected = (value) => {
    onFocusOut("enteredDate", value, dispatch, formState);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    props.onEnterUser(formState);
  };

  const formReset = (event) => {
    event.preventDefault();
    console.log(context.user);
  };
  return (
    <form
      className={classes.form}
      onSubmit={formSubmissionHandler}
      onReset={formReset}
    >
      <div className={classes.formControl}>
        <Input
          name="Name"
          i="user"
          hasError={formState.name.hasError}
          errorMsg={formState.name.error}
          touched={formState.name.touched}
          onBlur={(e) => {
            onFocusOut("name", e.target.value, dispatch, formState);
          }}
        />
      </div>
      <div className={classes.formControl}>
        <Input
          type="number"
          name="Balance"
          i="balance-scale"
          hasError={formState.balance.hasError}
          errorMsg={formState.balance.error}
          touched={formState.balance.touched}
          onBlur={(e) => {
            onFocusOut("balance", e.target.value, dispatch, formState);
          }}
        />
      </div>
      <div className={classes.formControl}>
        <ComboxBox
          i="calendar-day"
          list={list}
          onSelect={handleBalanceSelected}
          selected={formState.enteredDate.value}
          hasError={formState.enteredDate.hasError}
          errorMsg={formState.enteredDate.error}
          touched={formState.enteredDate.touched}
          onBlur={() => {
            onFocusOut(
              "enteredDate",
              formState.enteredDate.value,
              dispatch,
              formState
            );
          }}
          pleaseSelect="please select a tracking day"
        />
      </div>
      <div className={classes.actions}>
        <p>{props.error}</p>
        {props.loading ? (
          <LoadingSpinner />
        ) : (
          <Button type="submit">SAVE</Button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
