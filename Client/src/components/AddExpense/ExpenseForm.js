import React, { useState, useReducer, useContext } from "react";
import {
  Input,
  Icon,
  LoadingSpinner,
  SnackBar,
  Modal,
  Button,
} from "../../UIKit";
import {
  UPDATE_FORM,
  UPDATE_FIELD,
  CLEAR_FORM,
  onFocusOut,
  onChange,
  onClearForm,
  isFormDirtyFunc,
} from "../../formsUtils/ExpenseForm";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import classes from "./ExpenseForm.module.css";

const initialState = {
  storeName: { value: "", touched: false, hasError: false, error: "" },
  totalExpense: { value: "", touched: false, hasError: false, error: "" },
  enteredDate: { value: "", touched: false, hasError: false, error: "" },
  isFormValid: true,
};

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM: {
      const { name, value, touched, hasError, error, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], touched, value, hasError, error },
        isFormValid,
      };
    }
    case UPDATE_FIELD: {
      const { name, value } = action.data;
      return {
        ...state,
        [name]: { ...state[name], value },
      };
    }
    case CLEAR_FORM: {
      return initialState;
    }
    default:
      return state;
  }
};

const ExpenseForm = (props) => {
  const context = useContext(AppContext);
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isOperationSuc, setIsOperationSuc] = useState(false);
  const navigate = useNavigate();

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    props.onExpenseSubmit(formState);
    console.log(props.error);
    if (!props.error) {
      onClearForm(dispatch);
      setIsOperationSuc(true);
      setTimeout(() => setIsOperationSuc(false), 4000);
    }
  };

  const formResetHandler = (event) => {
    event.preventDefault();
    setIsFormDirty(isFormDirtyFunc(formState));
  };

  const confirmModalHandler = () => {
    onClearForm(dispatch);
    setIsFormDirty(false, navigate("/", { replace: true }));
  };

  return (
    <>
      {isFormDirty && (
        <Modal
          title="Are you sure you want to cancel the operation?"
          message="The data will be lost!"
          onConfirm={confirmModalHandler}
          onCancle={() => setIsFormDirty(false)}
        />
      )}
      {isOperationSuc && <SnackBar text="Expence Added " />}
      <form
        className={classes.form}
        onSubmit={formSubmissionHandler}
        onReset={formResetHandler}
      >
        <div className={classes.formControl}>
          <Input
            name="Store Name"
            i="store"
            hasError={formState.storeName.hasError}
            errorMsg={formState.storeName.error}
            touched={formState.storeName.touched}
            onChange={(e) => {
              onChange("storeName", e.target.value, dispatch);
            }}
            value={formState.storeName.value}
            onBlur={(e) => {
              onFocusOut("storeName", e.target.value, dispatch, formState);
            }}
          />
        </div>
        <div className={classes.formControl}>
          <Input
            name="Total Expense"
            type="number"
            i="money-check-alt"
            hasError={formState.totalExpense.hasError}
            errorMsg={formState.totalExpense.error}
            touched={formState.totalExpense.touched}
            onChange={(e) => {
              onChange("totalExpense", e.target.value, dispatch);
            }}
            value={formState.totalExpense.value}
            onBlur={(e) => {
              onFocusOut("totalExpense", e.target.value, dispatch, formState);
            }}
          />
        </div>
        <div className={classes.formControl}>
          <Input
            type="date"
            i="calendar-alt"
            hasError={formState.enteredDate.hasError}
            errorMsg={formState.enteredDate.error}
            touched={formState.enteredDate.touched}
            onChange={(e) => {
              onChange("enteredDate", e.target.value, dispatch);
            }}
            value={formState.enteredDate.value}
            onBlur={(e) => {
              onFocusOut("enteredDate", e.target.value, dispatch, formState);
            }}
          />
        </div>
        <div className={classes.actions}>
          <p>{props.error}</p>
          {props.loading ? (
            <LoadingSpinner />
          ) : (
            <Button type="submit">Add</Button>
          )}
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
