import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';
import { createList, updateListPosition, getTasksByBoard } from '../services/api';
import '../styles/Board.css';

const Board = ({ board }) => {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [board._id]);

  const fetchTasks = async () => {
    const res = await getTasksByBoard(board._id);
    setTasks(res.data);
    const uniqueListIds = [...new Set(res.data.map(task => task.list))];
    setLists(uniqueListIds.map(id => ({ _id: id, title: tasks.find(t => t.list === id)?.listTitle || 'List' })));
  };

  const handleAddList = async () => {
    if (!newListTitle) return;
    const res = await createList(newListTitle, board._id);
    setLists([...lists, res.data]);
    setNewListTitle('');
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const listTasks = tasks.filter(t => t.list === source.droppableId);
      const [movedTask] = listTasks.splice(source.index, 1);
      listTasks.splice(destination.index, 0, movedTask);
      const updatedTasks = tasks.map(t => 
        t.list === source.droppableId ? listTasks.shift() : t
      );
      setTasks(updatedTasks);
      await updateTask(draggableId, { position: destination.index });
    } else {
      const updatedTask = tasks.find(t => t._id === draggableId);
      updatedTask.list = destination.droppableId;
      updatedTask.position = destination.index;
      setTasks([...tasks.filter(t => t._id !== draggableId), updatedTask]);
      await updateTask(draggableId, { list: destination.droppableId, position: destination.index });
    }
  };

  return (
    <div className="board">
      <h2 className="board-title">{board.title}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-lists">
          {lists.map(list => (
            <List key={list._id} list={list} tasks={tasks.filter(t => t.list === list._id)} />
          ))}
          <div className="list-add">
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="New List Title"
              className="list-input"
            />
            <button onClick={handleAddList} className="list-add-btn">Add List</button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;