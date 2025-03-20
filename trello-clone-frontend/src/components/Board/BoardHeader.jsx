import { useState } from 'react'

function BoardHeader({ onAddList }) {
  const [listTitle, setListTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (listTitle.trim()) {
      onAddList(listTitle)
      setListTitle('')
    }
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Add a list..."
          className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add List
        </button>
      </form>
    </div>
  )
}

export default BoardHeader