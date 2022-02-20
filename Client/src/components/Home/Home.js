import React, { useContext, useState, useEffect } from "react";
import useAxios from "../../hooks/use-axios";
import AppContext from "../../context/AppContext";
import Expenses from "./Expenses/Expenses";
import { BASE_URL } from "../../api/options";

const Home = () => {
  const context = useContext(AppContext);
  const [expenses, setExpenses] = useState([]);
  const { data, fetchError, isLoading } = useAxios(`${BASE_URL}/users`);

  useEffect(() => {
    context?.user?.expense?.forEach((ex) => (ex.date = new Date(ex.date)));
    if (context?.user?.expense) {
      setExpenses(context.user.expense);
    }
    context.setUser(data?.user);
  }, [context, data]);

  return <div>{context.user && <Expenses items={expenses} />}</div>;
};

export default Home;
