import { useState } from 'react';

function BoardHeader({ onAddList }) {
  const [listTitle, setListTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listTitle.trim()) {
      onAddList(listTitle);
      setListTitle('');
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Add a new list..."
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Add List
        </button>
      </form>
    </div>
  );
}

export default BoardHeader;