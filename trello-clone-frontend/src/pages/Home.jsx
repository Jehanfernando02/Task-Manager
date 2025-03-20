import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, addBoard } from '../redux/slices/boardSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, loading, error } = useSelector((state) => state.boards);
  const { user, token } = useSelector((state) => state.auth);
  const [boardTitle, setBoardTitle] = useState('');

  useEffect(() => {
    console.log('Home useEffect - Token:', token);
    if (token) {
      dispatch(fetchBoards());
    }
  }, [dispatch, token]);

  const handleAddBoard = (e) => {
    e.preventDefault();
    if (boardTitle.trim()) {
      console.log('Adding board:', boardTitle);
      dispatch(addBoard(boardTitle));
      setBoardTitle('');
    }
  };

  console.log('Home render - User:', user, 'Boards:', boards);

  if (!token) {
    return <div className="p-6 text-center">Please log in to view your boards.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Boards</h2>
      <form onSubmit={handleAddBoard} className="mb-6 flex space-x-4">
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder="Create a new board..."
          className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Board
        </button>
      </form>
      {loading ? (
        <p>Loading boards...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message || error}</p>
      ) : boards.length === 0 ? (
        <p>No boards found. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div
              key={board._id}
              onClick={() => navigate(`/board/${board._id}`)}
              className="bg-primary text-white p-4 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              <h3 className="font-bold">{board.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;