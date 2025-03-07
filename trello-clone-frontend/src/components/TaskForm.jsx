// src/components/TaskForm.js
import React, { useState } from "react";
import { Box, Button, Input, Textarea, Select } from "@chakra-ui/react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="white">
      <form onSubmit={handleSubmit}>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title" 
          mb={4}
        />
        <Textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description" 
          mb={4}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} mb={4}>
          <option value="todo">To-do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Select>
        <Button type="submit" colorScheme="teal">Add Task</Button>
      </form>
    </Box>
  );
};

export default TaskForm;
