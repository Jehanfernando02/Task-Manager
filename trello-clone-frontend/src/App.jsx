import React, { useState } from 'react';
import { auth, googleProvider } from './firebase'; // Import auth and provider from firebase.js
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Sign in with Google
      const idToken = await result.user.getIdToken(); // Get the Firebase ID Token
      setUser(result.user); // Set user information
      setToken(idToken); // Set the ID token
      console.log('ID Token:', idToken); // Log the token for debugging
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Reset user state
      setToken(null); // Reset token state
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager Auth Test</h1>
      {!user ? (
        <button onClick={handleSignIn}>Sign In with Google</button>
      ) : (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <p>ID Token: <code>{token}</code></p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
