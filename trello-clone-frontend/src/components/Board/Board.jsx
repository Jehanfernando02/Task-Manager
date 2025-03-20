import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchTasks, addTask } from '../../redux/slices/taskSlice'
import { createList, getTasksByBoard } from '../../api/api'
import List from './List'
import BoardHeader from './BoardHeader'

function Board() {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.tasks)
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await getTasksByBoard(boardId)
        const allTasks = tasksResponse.data
        const uniqueListIds = [...new Set(allTasks.map((task) => task.list))]
        const fetchedLists = await Promise.all(
          uniqueListIds.map(async (listId) => {
            return { _id: listId, title: `List ${listId}` } // Replace with actual list fetch if API exists
          })
        )
        setLists(fetchedLists)
        dispatch(fetchTasks(boardId))
      } catch (error) {
        console.error('Board Fetch Error:', error)
      }
    }
    fetchData()
  }, [dispatch, boardId])

  const handleAddList = async (title) => {
    try {
      const response = await createList(title, boardId)
      setLists([...lists, response.data])
    } catch (error) {
      console.error('Add List Error:', error)
    }
  }

  const handleAddTask = (title, listId) => {
    dispatch(addTask({ title, boardId, listId }))
  }

  return (
    <div className="p-6">
      <BoardHeader onAddList={handleAddList} />
      {lists.length === 0 ? (
        <p>No lists found. Add a list to start!</p>
      ) : (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {lists.map((list) => (
            <List
              key={list._id}
              list={list}
              tasks={tasks.filter((task) => task.list === list._id)}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Board