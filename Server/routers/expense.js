const express = require("express");
const Expense = require("../models/expense");
const User = require("../models/user");
const router = new express.Router();

router.post("/expenses/:id", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const user = await User.findById(req.params.id);
    user.expense.push(expense);
    user.save();
    await expense.save();
    res.status(201).send({ expense });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/expenses", async (req, res) => {
  const expenses = await Expense.find(req.body);
  try {
    res.status(200).send({ expenses });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
