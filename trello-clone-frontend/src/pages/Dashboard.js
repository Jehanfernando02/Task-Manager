import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Board from '../components/Board';
import { AuthContext } from '../context/AuthContext';
import { createBoard, getBoards, setAuthToken } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchBoards();
    }
  }, [token]);

  const fetchBoards = async () => {
    try {
      const res = await getBoards();
      setBoards(res.data);
      console.log('Boards fetched:', res.data); // Debug log
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleAddBoard = async () => {
    if (!newBoardTitle) return;
    try {
      const res = await createBoard(newBoardTitle);
      setBoards([...boards, res.data]);
      setNewBoardTitle('');
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  if (!user) {
    return (
      <div className="dashboard-login">
        <Navbar />
        <div className="login-prompt">
          <h2>Welcome to TaskFlow</h2>
          <p>Please sign in with Google to start managing your tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="board-add">
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="New Board Title"
            className="board-input"
          />
          <button onClick={handleAddBoard} className="board-add-btn">Add Board</button>
        </div>
        <div className="boards">
          {boards.length === 0 ? (
            <p className="no-boards">No boards yet. Create one to get started!</p>
          ) : (
            boards.map(board => (
              <Board key={board._id} board={board} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;