import { FiEdit, FiUser, FiMail, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { useState } from 'react';

export default function Profile({ expenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Vianyak',
    email: 'vianyak@example.com',
    joinDate: '2023-05-15',
    monthlyBudget: 50000,
    currency: '₹',
  });

  expenses = expenses || [];

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetDiff = user.monthlyBudget - totalExpenses;
  const budgetUsagePercent = Math.min((totalExpenses / user.monthlyBudget) * 100, 100);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  // Get top 4 categories with most spending
  const topCategories = Object.entries(categoryTotals)
    .map(([category, total]) => ({ category, amount: total }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  const getSuggestion = (category) => {
    switch (category) {
      case 'Food':
        return 'Consider meal prepping to reduce eating out costs.';
      case 'Transportation':
        return 'Look into carpooling or public transit passes.';
      case 'Entertainment':
        return 'Limit streaming subscriptions or nights out.';
      case 'Shopping':
        return 'Plan purchases and wait for sales.';
      default:
        return 'Review spending habits in this category.';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
          >
            <FiEdit className="mr-2" /> Edit
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
            className="space-y-3"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Budget</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  {user.currency}
                </span>
                <input
                  type="number"
                  value={user.monthlyBudget}
                  onChange={(e) => setUser({ ...user, monthlyBudget: Number(e.target.value) })}
                  className="flex-1 p-2 border border-gray-300 rounded-r-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
              <FiUser className="text-indigo-700 text-2xl" />
            </div>
            <div className="leading-tight">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 flex items-center text-sm">
                <FiMail className="mr-1" /> {user.email}
              </p>
              <p className="text-gray-500 flex items-center text-sm">
                <FiCalendar className="mr-1" /> Member since{' '}
                {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center">
          <p className="text-xs text-gray-500">Budget</p>
          <p className="text-lg font-bold">{user.currency}{user.monthlyBudget.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center">
          <p className="text-xs text-gray-500">Spent</p>
          <p className="text-lg font-bold text-red-500">{user.currency}{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center">
          <p className="text-xs text-gray-500">Remaining</p>
          <p className="text-lg font-bold text-green-500">{user.currency}{budgetDiff.toLocaleString()}</p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Budget Usage</span>
          <span className={`text-sm font-medium ${budgetDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {budgetDiff >= 0 ? `+${user.currency}${budgetDiff.toLocaleString()}` : `-${user.currency}${Math.abs(budgetDiff).toLocaleString()}`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-700 ease-out ${budgetDiff >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${budgetUsagePercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{totalExpenses.toLocaleString()} spent of {user.currency}{user.monthlyBudget.toLocaleString()}</p>
      </div>

      {/* Top Spending Categories */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <h4 className="text-sm font-medium text-indigo-600 mb-3 flex items-center">
          <FiTrendingUp className="mr-1" /> Top Spending Categories & Tips
        </h4>
        <div className="space-y-2">
          {topCategories.map((cat, idx) => (
            <div key={idx} className="bg-indigo-50 p-3 rounded-lg">
              <p className="font-medium text-indigo-700">
                {cat.category} – {user.currency}{cat.amount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">
                💡 {getSuggestion(cat.category)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
