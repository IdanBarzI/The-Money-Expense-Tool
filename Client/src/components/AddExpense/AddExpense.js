import React, { useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import useHttp from "../../hooks/use-http";
import AppContext from "../../context/AppContext";
import { BASE_URL } from "../../api/options";
import classes from "./AddExpense.module.css";

const AddExpense = () => {
  const { isLoading, error, sendRequest: sendAddExpRequest } = useHttp();
  const context = useContext(AppContext);

  const addExpenseHandler = async (formState) => {
    if (formState.isFormValid) {
      await sendAddExpRequest(
        {
          url: `${BASE_URL}/expenses/${context?.user?._id}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            storeName: formState.storeName.value,
            totalExpense: formState.totalExpense.value,
            date: formState.enteredDate.value,
          },
        },
        (data) => {}
      );
    }
  };
  return (
    <div className={classes.continer}>
      <ExpenseForm
        onExpenseSubmit={addExpenseHandler}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default AddExpense;
