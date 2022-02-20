const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  storeName: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  totalExpense: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  date: {
    type: Date,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
