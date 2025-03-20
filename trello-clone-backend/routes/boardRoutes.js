const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

const createBoard = async (req, res) => {
  const { title } = req.body;
  try {
    const board = await Board.create({ title, owner: req.user.uid }); // Use uid from Firebase token
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ $or: [{ owner: req.user.uid }, { members: req.user.uid }] });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

router.post('/', createBoard);
router.get('/', getBoards);

module.exports = router;