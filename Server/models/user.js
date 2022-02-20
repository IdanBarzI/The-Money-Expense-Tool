const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Expense = require("../models/expense");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  balance: {
    type: Number,
    required: true,
    minlength: 1,
  },
  trackingDay: {
    type: String,
    required: true,
  },
  endMonthMoney: {
    type: Number,
  },
  monthMoney: {
    type: Number,
    default: 0,
  },
  expense: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

const getExpenseBorders = (user) => {
  const date = new Date();
  let currentMonth = parseInt(date.getMonth()) + 1;
  let currentYear = parseInt(date.getFullYear());
  let currentDay = parseInt(date.getDate());
  let StartTrackingDate;
  let EndTrackingDate;
  if (currentDay < user?.trackingDay) {
    StartTrackingDate = new Date(
      `${currentMonth - 1}/${user?.trackingDay}/${currentYear}`
    );
    EndTrackingDate = new Date(
      `${currentMonth}/${user?.trackingDay}/${currentYear}`
    );
  } else {
    StartTrackingDate = new Date(
      `${currentMonth}/${user?.trackingDay}/${currentYear}`
    );
    EndTrackingDate = new Date(
      `${currentMonth + 1}/${user?.trackingDay}/${currentYear}`
    );
  }
  return [StartTrackingDate, EndTrackingDate];
};

userSchema.pre("save", async function (next) {
  const user = this;

  let [StartTrackingDate, EndTrackingDate] = getExpenseBorders(user);
  let monthlyExpenses = 0;
  for (exp of user.expense) {
    expe = await Expense.findById(exp);
    if (expe?.date) {
      if (expe?.date >= StartTrackingDate && expe?.date <= EndTrackingDate) {
        monthlyExpenses += expe.totalExpense;
      }
    }
  }
  user.monthMoney = monthlyExpenses;
  user.endMonthMoney = user.balance - monthlyExpenses;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
