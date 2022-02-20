export const UPDATE_FORM = "UPDATE_FORM";
export const CLEAR_FORM = "CLEAR_FORM";
export const UPDATE_FIELD = "UPDATE_FIELD";

export const onFocusOut = (name, value, dispatch, formState) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};

export const onClearForm = (dispatch) => {
  dispatch({
    type: CLEAR_FORM,
    data: {},
  });
};

export const onChange = (name, value, dispatch) => {
  dispatch({
    type: UPDATE_FIELD,
    data: { name, value },
  });
};

export const isFormDirtyFunc = (formState) => {
  let isFormDirty = false;
  for (const key in formState) {
    const item = formState[key];
    if (item.value.length > 0) {
      isFormDirty = true;
      break;
    }
  }
  return isFormDirty;
};

const validateInput = (name, value) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "storeName":
      if (value.length <= 0) {
        hasError = true;
        error = "Store Name cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "totalExpense":
      if (value.length <= 0) {
        hasError = true;
        error = "Total Expense cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "enteredDate":
      console.log(value);
      if (!value) {
        hasError = true;
        error = "Tracking Day cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
