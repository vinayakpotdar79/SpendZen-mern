import express from 'express';
import { getExpenses, addExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';
import Expense from "../models/Expense.js";
const router = express.Router();


router.get('/', protect, getExpenses);
router.post('/', protect, addExpense);

// Get only logged-in user's expenses
router.get("/my", protect, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
});

// Create expense
router.post("/", protect, async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(expense);
});

export default router;


