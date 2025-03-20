import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTasks, addTask } from '../../redux/slices/taskSlice';
import { createList } from '../../api/api';
import BoardHeader from './BoardHeader';
import List from './List';

function Board() {
  const { boardId } = use用的Params();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks(boardId));
  }, [dispatch, boardId]);

  const handleAddList = async (title) => {
    const response = await createList(title, boardId);
    setLists([...lists, response.data]);
  };

  const handleAddTask = (title, listId) => {
    dispatch(addTask({ title, boardId, listId }));
  };

  return (
    <div className="p-6">
      <BoardHeader onAddList={handleAddList} />
      <div className="flex space-x-4 overflow-x-auto">
        {lists.map((list) => (
          <List
            key={list._id}
            list={list}
            tasks={tasks.filter((task) => task.list === list._id)}
            onAddTask={handleAddTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;