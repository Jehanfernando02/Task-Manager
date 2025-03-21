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
            data: { list: dropResult.listId },
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
      className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h4>
    </div>
  );
}

export default TaskCard;