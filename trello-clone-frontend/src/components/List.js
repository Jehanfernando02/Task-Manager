import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { createTask } from '../services/api';
import '../styles/List.css';

const List = ({ list, tasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = async () => {
    if (!newTaskTitle) return;
    const res = await createTask(newTaskTitle, list.board, list._id);
    setNewTaskTitle('');
  };

  return (
    <div className="list">
      <h3 className="list-title">{list.title}</h3>
      <Droppable droppableId={list._id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list-tasks"
          >
            {tasks.map((task, index) => (
              <Task key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="New Task"
        className="task-input"
      />
      <button onClick={handleAddTask} className="task-add-btn">Add Task</button>
    </div>
  );
};

export default List;