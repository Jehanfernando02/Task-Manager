import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateTaskPosition } from '../../redux/slices/taskSlice';

function TaskCard({ task }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(
          updateTaskPosition({
            taskId: item.id,
            data: { listId: dropResult.listId },
          })
        );
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white dark:bg-gray-800 p-3 rounded shadow ${isDragging ? 'opacity-50' : ''}`}
    >
      <h4>{task.title}</h4>
    </div>
  );
}

export default TaskCard;