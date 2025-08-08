import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { groupBy } from "lodash";
import { format, subMonths } from "date-fns";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyTrend({ expenses }) {
  // Process data
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return format(date, "MMM yyyy");
  });

  const groupedByMonth = groupBy(expenses, (expense) =>
    format(new Date(expense.date), "MMM yyyy")
  );

  const monthlyData = months.map((month) => {
    const monthExpenses = groupedByMonth[month] || [];
    return monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  });

  // Chart data
  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Spending (₹)",
        data: monthlyData,
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "6-Month Spending Trend",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mt-6">
      <Line data={data} options={options} />
    </div>
  );
}