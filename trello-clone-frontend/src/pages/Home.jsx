import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, addBoard } from '../redux/slices/boardSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards, loading } = useSelector((state) => state.boards);
  const { token } = useSelector((state) => state.auth);
  const [boardTitle, setBoardTitle] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchBoards());
    }
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardTitle.trim()) {
      dispatch(addBoard(boardTitle));
      setBoardTitle('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Boards</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-4">
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder="Add a board..."
          className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : boards.length === 0 ? (
        <p>No boards yet. Create one!</p>
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