export const UPDATE_FORM = "UPDATE_FORM";

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

const validateInput = (name, value) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "name":
      if (value.length <= 0) {
        hasError = true;
        error = "Name cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "balance":
      if (value.length <= 0) {
        hasError = true;
        error = "Balance cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "enteredDate":
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
