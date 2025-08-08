import { createContext, useContext, useState, useEffect } from 'react';
import { API } from '../api';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/expenses');
      setExpenses(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error("Error fetching expenses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await API.post('/expenses', expenseData);
      setExpenses(prev => [...prev, res.data]);
      return true;
    } catch (err) {
      console.error("Error adding expense:", err);
      return false;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting expense:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{
      expenses,
      isLoading,
      error,
      addExpense,
      deleteExpense,
      refreshExpenses: fetchExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}