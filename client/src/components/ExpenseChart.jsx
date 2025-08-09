import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { groupBy, size } from 'lodash';
import { format, subDays, isAfter, startOfDay } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 6);

  // Filter expenses to only the last 7 days
  const last7DaysExpenses = expenses.filter(expense =>
    isAfter(new Date(expense.date), sevenDaysAgo) || 
    startOfDay(new Date(expense.date)).getTime() === sevenDaysAgo.getTime()
  );

  // Group by day
  const groupedByDay = groupBy(last7DaysExpenses, expense =>
    format(new Date(expense.date), 'MMM dd')
  );

  const days = Object.keys(groupedByDay).sort((a, b) => 
    new Date(a) - new Date(b)
  );

  // Sum per day
  const dailyTotals = days.map(day =>
    groupedByDay[day].reduce((sum, exp) => sum + exp.amount, 0)
  );

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Daily Expenses (₹)',
        data: dailyTotals,
            backgroundColor: 'rgba(127, 17, 224,0.8)', // lavender with transparency
            borderColor: 'rgba(230, 230, 250, 1)',       
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Last 7 Days Expenses',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount (₹)' },
      },
    },
  };

  return (
<div 
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 
             w-full h-64 md:h-[600px]"
>
  <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
</div>

  );
}
