const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });
  res.json(tasks);
});

// Create a new task
router.post("/", auth, async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const newTask = new Task({ title, description, status, assignedTo, createdBy: req.user.id });

  await newTask.save();
  res.status(201).json(newTask);
});

// Update task status
router.put("/:id", auth, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
