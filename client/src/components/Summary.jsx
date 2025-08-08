import React from 'react';
import { format } from 'date-fns';

export default function Summary({ expenses }) {
  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  
  const todayExpenses = expenses.filter(
    e => format(new Date(e.date), 'yyyy-MM-dd') === todayStr
  );
  const todayTotal = todayExpenses.reduce((acc, e) => acc + e.amount, 0);

  const monthlyTotal = expenses
    .filter(e => {
      const expDate = new Date(e.date);
      return expDate.getMonth() === today.getMonth() && 
             expDate.getFullYear() === today.getFullYear();
    })
    .reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Today's Spending</h3>
            <p className="mt-1 text-2xl font-semibold text-indigo-600">₹{todayTotal.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          {todayExpenses.length} {todayExpenses.length === 1 ? 'transaction' : 'transactions'} today
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
            <p className="mt-1 text-2xl font-semibold text-purple-600">₹{monthlyTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">All Time</h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">₹{total.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'} total
        </div>
      </div>
    </div>
  );
}