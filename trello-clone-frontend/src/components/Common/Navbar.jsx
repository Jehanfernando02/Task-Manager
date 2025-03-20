import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Trello Clone</h1>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;