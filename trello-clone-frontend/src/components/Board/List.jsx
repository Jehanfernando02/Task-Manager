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
      className={`w-72 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg ${isOver ? 'ring-2 ring-accent' : ''} transition-all duration-200`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{list.title}</h3>
      <div className="space-y-3">
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
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default List;