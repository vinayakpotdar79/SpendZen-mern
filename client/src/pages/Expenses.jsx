import React from "react";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";

export default function ExpensesPage({ expenses, isLoading, onAdd, deleteExpense }) {
  return (
    <main className="pt-20 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="space-y-6">
      <AddExpense onAdd={onAdd} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
    </main>
  );
}
