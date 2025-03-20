import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
  const { loading, error } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log('Login: Got token', idToken); // Debug log
      dispatch(login(idToken)).unwrap().then(
        () => console.log('Login dispatched successfully'),
        (err) => console.error('Login dispatch failed:', err)
      );
    } catch (err) {
      console.error('Google Login Error:', err);
      setLocalError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Trello Clone</h2>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        {(error || localError) && (
          <p className="text-red-500 mt-4">{error || localError}</p>
        )}
      </div>
    </div>
  );
}

export default Login;