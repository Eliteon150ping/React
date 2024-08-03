import React, { useState, useEffect } from 'react';

// Custom React hook for managing state with local storage
function useLocalStorage(key, initialValue) {
    // useState hook to manage state value
    const [value, setValue] = useState(() => {
        // Function to retrieve stored value from local storage
        const storedValue = localStorage.getItem(key);
        // If stored value exists, parse it from JSON, otherwise use initial value
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    // useEffect hook to synchronize state value with local storage
    useEffect(() => {
        // Update local storage whenever key or value changes
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Return state value and function to update it
    return [value, setValue];
}

export default useLocalStorage;
