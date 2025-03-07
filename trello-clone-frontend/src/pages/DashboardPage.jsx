// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import axios from "axios";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    const response = await axios.post("http://localhost:5000/api/tasks", task, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks([...tasks, response.data]);
  };

  const handleUpdateStatus = async (taskId) => {
    const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
      status: "done",
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks(tasks.map(task => task._id === taskId ? response.data : task));
  };

  const handleDelete = async (taskId) => {
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  return (
    <Box p={4}>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
    </Box>
  );
};

export default DashboardPage;
