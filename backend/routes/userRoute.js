const express = require("express");
const mongoose = require("mongoose");
const user = require("../models/userModel");
const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const foundUser = await user.findById(req.params.id);
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/user", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;

  try {
    const addedUser = await user.create({
      name: name,
      age: age,
      email: email,
    });

    res.status(200).json(addedUser);
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(500)
        .json({ error: "This email already taken. Please use another email" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    // user.save();
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(500)
        .json({ error: "This email already taken. Please use another email" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;
