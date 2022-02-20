import React, { useContext } from "react";
import UserForm from "./UserForm";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { BASE_URL } from "../../api/options";
import classes from "./NewUser.module.css";

const NewUser = (props) => {
  const { isLoading, error, sendRequest: sendUpdateUserRequest } = useHttp();
  const context = useContext(AppContext);

  const enterUserHandler = async (formState) => {
    if (formState.isFormValid) {
      await sendUpdateUserRequest(
        {
          url: `${BASE_URL}/users/${context?.user?._id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            name: formState.name.value,
            balance: formState.balance.value,
            trackingDay: formState.enteredDate.value,
          },
        },
        (data) => context.setUser(data)
      );
    }
  };

  return (
    <section>
      <UserForm
        onEnterUser={enterUserHandler}
        loading={isLoading}
        error={error}
      />
    </section>
  );
};

export default NewUser;
