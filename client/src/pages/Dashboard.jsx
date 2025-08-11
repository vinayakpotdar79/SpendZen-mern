import React from "react";
import Summary from "../components/Summary";
import ExpenseChart from "../components/ExpenseChart";
import CategoryChart from "../components/CategoryChart";
import MonthlyTrend from "../components/MonthlyTrend";

export default function Dashboard({ expenses }) {
  return (
    <main className="pt-20 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="space-y-6">
      <Summary expenses={expenses} />
      <div className="grid md:grid-cols-2 gap-6">
        <ExpenseChart expenses={expenses} />
        <CategoryChart expenses={expenses} />
      </div>
      <MonthlyTrend expenses={expenses} />
    </div>
    </main>
  );
}
