import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { groupBy, map } from 'lodash';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  const groupedByDay = groupBy(expenses, expense => 
    format(new Date(expense.date), 'MMM dd')
  );

  const days = Object.keys(groupedByDay);
  const dailyTotals = Object.values(groupedByDay).map(dayExpenses => 
    dayExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  );

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Daily Expenses (₹)',
        data: dailyTotals,
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Expenses',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <Bar data={data} options={options} />
    </div>
  );
}