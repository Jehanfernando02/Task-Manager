import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTasks, addTask } from '../../redux/slices/taskSlice';
import { createList } from '../../api/api';
import BoardHeader from './BoardHeader';
import List from './List';

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks(boardId));
  }, [dispatch, boardId]);

  const handleAddList = async (title) => {
    try {
      const response = await createList(title, boardId);
      setLists([...lists, response.data]);
    } catch (error) {
      console.error('Add list error:', error);
    }
  };

  const handleAddTask = (title, listId) => {
    dispatch(addTask({ title, boardId, listId }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <BoardHeader onAddList={handleAddList} />
      <div className="flex space-x-6 overflow-x-auto py-4">
        {lists.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No lists yet. Add one!</p>
        ) : (
          lists.map((list) => (
            <List
              key={list._id}
              list={list}
              tasks={tasks.filter((task) => task.list === list._id)}
              onAddTask={handleAddTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;