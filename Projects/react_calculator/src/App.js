import React, { useState } from 'react';
import useLocalStorage from './Localstorage'; // Import the custom hook for local storage
import './App.css';

function App() {
  // State hooks for managing display, history, and history visibility
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useLocalStorage('calculatorHistory', []); // Using custom hook for local storage
  const [showHistory, setShowHistory] = useState(true);

  // Function to toggle visibility of history
  const toggleHistoryVisibility = () => {
    setShowHistory(prevShowHistory => !prevShowHistory);
  };

  // Function to hide history
  const hideHistory = () => {
    setShowHistory(false);
  };

  // Function to append value to display
  const appendToDisplay = value => {
    setDisplay(prevDisplay => prevDisplay + value);
  };

  // Function to calculate and update display and history
  const calculate = () => {
    try {
      const result = eval(display);
      setHistory(prevHistory => [...prevHistory, `${display} = ${result}`]);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  // Function to clear display
  const clearDisplay = () => {
    setDisplay('');
  };

  return (
    <div className="container">
      <h1>My React Calculator App</h1> 
      {/* Button to toggle history visibility */}
      <button className="toggle-history-button" onClick={toggleHistoryVisibility}>
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
      {/* Container for history */}
      <div id="history-container" className={showHistory ? 'show' : 'hide'}>
        <div id="history">
          {/* Display history items */}
          {history.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      {/* Calculator container */}
      <div id="calculator">
        {/* Display input */}
        <input id="display" readOnly value={display} />
        {/* Calculator keys */}
        <div id="keys">
          <button onClick={() => appendToDisplay('+')} className="operator-btn">+</button>
          <button onClick={() => appendToDisplay('7')}>7</button>
          <button onClick={() => appendToDisplay('8')}>8</button>
          <button onClick={() => appendToDisplay('9')}>9</button>
          <button onClick={() => appendToDisplay('-')} className="operator-btn">-</button>
          <button onClick={() => appendToDisplay('4')}>4</button>
          <button onClick={() => appendToDisplay('5')}>5</button>
          <button onClick={() => appendToDisplay('6')}>6</button>
          <button onClick={() => appendToDisplay('*')} className="operator-btn">*</button>
          <button onClick={() => appendToDisplay('1')}>1</button>
          <button onClick={() => appendToDisplay('2')}>2</button>
          <button onClick={() => appendToDisplay('3')}>3</button>
          <button onClick={() => appendToDisplay('/')} className="operator-btn">/</button>
          <button onClick={() => appendToDisplay('0')}>0</button>
          <button onClick={() => appendToDisplay('.')}>.</button>
          <button onClick={calculate}>=</button>
          <button onClick={clearDisplay} className="operator-btn">C</button>
        </div>
      </div>
    </div>
  );
}

export default App;
