import express from 'express';
import { getExpenses, addExpense } from '../controllers/expenseController.js';

const app = express()

app.get('/', getExpenses);
app.post('/', addExpense);

export default app;
