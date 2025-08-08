import React from "react";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";

export default function ExpensesPage({ expenses, addExpense, deleteExpense }) {
  return (
    <div className="space-y-6">
      <AddExpense onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}
