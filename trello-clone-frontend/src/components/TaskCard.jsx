// src/components/TaskCard.js
import React from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4} boxShadow="sm" bg="white">
      <VStack align="start">
        <Text fontWeight="bold" fontSize="xl">{task.title}</Text>
        <Text>{task.description}</Text>
        <Text>Status: {task.status}</Text>
        <Button onClick={() => onUpdateStatus(task._id)} colorScheme="blue">
          Move to {task.status === "todo" ? "In Progress" : "Done"}
        </Button>
        <Button onClick={() => onDelete(task._id)} colorScheme="red">
          Delete
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskCard;
