import { useState } from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

function List({ list, tasks, onAddTask }) {
  const [taskTitle, setTaskTitle] = useState('');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: () => ({ listId: list._id }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle, list._id);
      setTaskTitle('');
    }
  };

  return (
    <div
      ref={drop}
      className={`w-64 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg ${isOver ? 'bg-gray-200' : ''}`}
    >
      <h3 className="font-bold mb-4">{list.title}</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add a task..."
          className="w-full p-2 rounded border dark:bg-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-primary text-white py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default List;