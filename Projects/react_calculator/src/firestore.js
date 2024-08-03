// firestore.js
import { collection, getDocs, addDoc, query, where, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import the Firestore database instance

// Function to fetch the calculation history for a specific user
export const fetchHistory = async (userId) => {
  // Create a query to find documents in the 'history' collection where 'userId' matches the provided userId
  const q = query(collection(db, 'history'), where('userId', '==', userId));
  // Execute the query and get the results
  const querySnapshot = await getDocs(q);
  // Map over the results and return an array of history items including their document ID
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Function to save a new calculation to the user's history
export const saveHistory = async (userId, expression, result) => {
  try {
    // Add a new document to the 'history' collection with the user's ID, the expression, and the result
    const docRef = await addDoc(collection(db, 'history'), {
      userId,
      expression,
      result,
    });
    console.log('Document written with ID: ', docRef.id); // Log the document ID to the console
  } catch (e) {
    console.error('Error adding document: ', e); // Log any errors that occur
  }
};

// Function to clear the calculation history for a specific user
export const clearUserHistory = async (userId) => {
  // Create a query to find documents in the 'history' collection where 'userId' matches the provided userId
  const q = query(collection(db, 'history'), where('userId', '==', userId));
  // Execute the query and get the results
  const querySnapshot = await getDocs(q);
  // Map over the results and create an array of promises to delete each document
  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  // Wait for all delete operations to complete
  await Promise.all(deletePromises);
};
