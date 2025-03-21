import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, addBoard } from '../redux/slices/boardSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, loading, error } = useSelector((state) => state.boards);
  const { token } = useSelector((state) => state.auth);
  const [boardTitle, setBoardTitle] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchBoards());
    }
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (boardTitle.trim()) {
      try {
        await dispatch(addBoard(boardTitle)).unwrap();
        setBoardTitle('');
      } catch (err) {
        console.error('Add board failed:', err);
      }
    }
  };

  if (!token) {
    return <Login />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Your Boards
      </h2>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder="Create a new board..."
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 shadow-md"
        >
          {loading ? 'Adding...' : 'Add Board'}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mb-4">
          {typeof error === 'string' ? error : error.message || 'Failed to load boards'}
        </p>
      )}
      {loading && !boards.length ? (
        <p className="text-gray-600 dark:text-gray-300">Loading boards...</p>
      ) : boards.length === 0 && !error ? (
        <p className="text-gray-600 dark:text-gray-300">No boards yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boards.map((board) => (
            <div
              key={board._id}
              onClick={() => navigate(`/board/${board._id}`)}
              className="bg-primary text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{board.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;