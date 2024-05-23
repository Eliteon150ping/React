import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { fetchHistory, clearUserHistory } from './firestore';
import { auth, provider } from './firebase';
import Calculator from './calculator';
import './App.css';

function App() {
  // State to hold the authenticated user information
  const [user, setUser] = useState(null);
  // State to hold the user's calculation history
  const [history, setHistory] = useState([]);
  // State to control the visibility of the history section
  const [showHistory, setShowHistory] = useState(true);

  // useEffect hook to set up the authentication state observer
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // If the user is logged in, set the user state and fetch their history
        setUser(currentUser);
        const fetchedHistory = await fetchHistory(currentUser.uid);
        setHistory(fetchedHistory);
      } else {
        // If the user is logged out, clear the user and history states
        setUser(null);
        setHistory([]);
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Function to handle Google sign-in
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Set the user state to the authenticated user
        setUser(result.user);
      })
      .catch((error) => {
        // Log any errors that occur during sign-in
        console.error(error);
      });
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Clear the user and history states on sign-out
      setUser(null);
      setHistory([]);
    }).catch((error) => {
      // Log any errors that occur during sign-out
      console.error(error);
    });
  };

  // Function to toggle the visibility of the history section
  const toggleHistoryVisibility = () => {
    setShowHistory(prevShowHistory => !prevShowHistory);
  };

  // Function to clear the user's calculation history
  const clearHistory = async () => {
    if (user) {
      // Clear history from the database and update the state
      await clearUserHistory(user.uid);
      setHistory([]);
    }
  };

  return (
    <div className="container">
      {user ? (
        // If the user is authenticated, show the user info, history, and calculator
        <>
          <div className="user-info">
            <img src={user.photoURL} alt="User profile" className="user-photo" />
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
          <button className="clear-history-button" onClick={clearHistory}>
            Clear History
          </button>
          <button className="toggle-history-button" onClick={toggleHistoryVisibility}>
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          <div id="history-container" className={showHistory ? 'show' : 'hide'}>
            <div id="history">
              {history.map((item, index) => (
                <div key={index}>{item.expression} = {item.result}</div>
              ))}
            </div>
          </div>
          <Calculator userId={user.uid} updateHistory={(newHistory) => setHistory((prevHistory) => [...prevHistory, newHistory])} />
        </>
      ) : (
        // If the user is not authenticated, show the sign-in button
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
