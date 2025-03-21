import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary text-white p-4 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight">Trello Clone</h1>
        <div className="flex items-center space-x-6">
          {token && user ? (
            <>
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium hover:underline"
            >
              Please log in
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;