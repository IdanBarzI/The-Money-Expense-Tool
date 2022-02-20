const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/all", async (req, res) => {
  const users = await User.find({}).populate("expense");
  try {
    res.status(200).send({ users });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  const user = await User.findOne({}).populate("expense");
  try {
    res.status(200).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "balance", "trackingDay"];
  const isValidOpperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOpperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("expense");
    user.save();
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
