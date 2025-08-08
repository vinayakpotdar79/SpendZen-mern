import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { groupBy, map } from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ expenses }) {
  const groupedByCategory = groupBy(expenses, 'category');
  
  const categories = Object.keys(groupedByCategory);
  const categoryTotals = Object.values(groupedByCategory).map(catExpenses => 
    catExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  );

  const backgroundColors = [
    'rgba(79, 70, 229, 0.6)',
    'rgba(99, 102, 241, 0.6)',
    'rgba(129, 140, 248, 0.6)',
    'rgba(167, 139, 250, 0.6)',
    'rgba(217, 70, 239, 0.6)',
    'rgba(236, 72, 153, 0.6)',
    'rgba(244, 63, 94, 0.6)',
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <Pie data={data} options={options} />
    </div>
  );
}