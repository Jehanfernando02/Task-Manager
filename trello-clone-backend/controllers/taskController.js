const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const newTask = new Task({ title, description, status, assignedTo, createdBy: req.user.id });

  await newTask.save();
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
