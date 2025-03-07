// src/components/TaskList.js
import React from "react";
import TaskCard from "./TaskCard";
import { Box, SimpleGrid } from "@chakra-ui/react";

const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  return (
    <SimpleGrid columns={3} spacing={4}>
      {tasks.map(task => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onUpdateStatus={onUpdateStatus} 
          onDelete={onDelete}
        />
      ))}
    </SimpleGrid>
  );
};

export default TaskList;
