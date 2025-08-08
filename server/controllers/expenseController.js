import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addExpense = async (req, res) => {
  const { date, category, amount, note } = req.body;
  try {
    const newExpense = new Expense({ date, category, amount, note });
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
