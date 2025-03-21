import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log('Google login success, token:', idToken.substring(0, 10) + '...');
      await dispatch(login(idToken)).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-blue-700">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          Welcome to Trello Clone
        </h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.24 10.32v2.27h3.32c-.13 1.22-.49 2.13-1.47 2.81-1.31.91-3.03 1.05-4.62.36-1.65-.72-2.74-2.37-2.74-4.17s1.09-3.45 2.74-4.17c1.59-.69 3.31-.55 4.62.36l1.47-1.47c-1.97-1.81-4.83-2.27-7.36-1.18-2.81 1.22-4.62 4.03-4.62 7.09s1.81 5.87 4.62 7.09c2.53 1.09 5.39.63 7.36-1.18 1.97-1.81 2.43-4.67 1.18-7.36h-4.5z"
            />
          </svg>
          Sign in with Google
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;