import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/Task.css';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          <h4 className="task-title">{task.title}</h4>
          <p className="task-status">{task.status}</p>
          {task.assignees.length > 0 && (
            <p className="task-assignees">Assigned to: {task.assignees.map(a => a.name).join(', ')}</p>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;