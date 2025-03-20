import { useDrag } from 'react-dnd'
import { useState } from 'react'
import TaskModal from './TaskModal'

function TaskCard({ task }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <>
      <div
        ref={drag}
        onClick={() => setIsModalOpen(true)}
        className={`bg-white dark:bg-gray-800 p-3 rounded shadow cursor-pointer ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <h4 className="font-medium">{task.title}</h4>
        {task.description && <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>}
      </div>
      {isModalOpen && <TaskModal task={task} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default TaskCard