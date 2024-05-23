// calculator.js
import React, { useState } from 'react';
import { saveHistory } from './firestore';

const Calculator = ({ userId, updateHistory }) => {
  // State to hold the current value displayed on the calculator
  const [display, setDisplay] = useState('');
  // State to manage whether the calculator is currently performing a calculation
  const [isCalculating, setIsCalculating] = useState(false);

  // Function to append a value to the current display
  const appendToDisplay = value => {
    setDisplay(prevDisplay => prevDisplay + value);
  };

  // Function to perform the calculation
  const calculate = () => {
    try {
      setIsCalculating(true); // Indicate that a calculation is in progress
      const result = eval(display); // Evaluate the expression in the display
      setDisplay(result.toString()); // Update the display with the result
      const newHistoryItem = { expression: display, result: result.toString() }; // Create a new history item
      updateHistory(newHistoryItem); // Update the history in the parent component
      // Save history asynchronously to avoid blocking UI updates
      saveHistory(userId, display, result.toString()).finally(() => {
        setIsCalculating(false); // Indicate that the calculation is complete
      });
    } catch (error) {
      setDisplay('Error'); // Show 'Error' if the calculation fails
      setIsCalculating(false); // Indicate that the calculation is complete
    }
  };

  // Function to clear the current display
  const clearDisplay = () => {
    setDisplay('');
  };

  return (
    <div id="calculator">
      {/* Input field to display the current value, disabled when a calculation is in progress */}
      <input id="display" readOnly value={display} disabled={isCalculating} />
      <div id="keys">
        {/* Buttons for digits and operators */}
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
  );
};

export default Calculator;
