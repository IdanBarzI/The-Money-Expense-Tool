import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";

import { Chart } from "../../../UIKit";

const ExpensesChart = (props) => {
  const context = useContext(AppContext);
  const chartDataPoints = [
    {
      label: `${context?.user?.trackingDay}Jan - ${context?.user?.trackingDay}Feb`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Feb - ${context?.user?.trackingDay}Mar`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Mar - ${context?.user?.trackingDay}Apr`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Apr - ${context?.user?.trackingDay}May`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}May - ${context?.user?.trackingDay}Jun`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Jun - ${context?.user?.trackingDay}Jul`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Jul - ${context?.user?.trackingDay}Aug`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Aug - ${context?.user?.trackingDay}Sep`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Sep - ${context?.user?.trackingDay}Oct`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Oct - ${context?.user?.trackingDay}Nov`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Nov - ${context?.user?.trackingDay}Dec`,
      value: 0,
    },
    {
      label: `${context?.user?.trackingDay}Dec - ${context?.user?.trackingDay}Jan`,
      value: 0,
    },
  ];

  for (const expense of props.expenses) {
    let expenseMonth = expense.date.getMonth(); // starting at 0 => January => 0
    const expenseDay = expense.date.getDate();
    // console.log(expenseDay);
    if (expenseDay <= context?.user?.trackingDay) {
      if (expenseMonth === 0) {
        expenseMonth += 12;
      }
      expenseMonth -= 1;
    }
    // console.log(chartDataPoints[expenseMonth].value);
    chartDataPoints[expenseMonth].value += expense.totalExpense;
  }

  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
