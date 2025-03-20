import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from './Login'

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (!token) {
    return <Login />
  }

  return children
}

export default ProtectedRoute