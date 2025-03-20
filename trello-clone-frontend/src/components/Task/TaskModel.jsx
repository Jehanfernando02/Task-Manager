function TaskModal({ task, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">{task.title}</h2>
          <p className="mb-4">{task.description}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default TaskModal